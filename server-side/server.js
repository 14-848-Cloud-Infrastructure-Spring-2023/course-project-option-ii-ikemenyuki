const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { spawnSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const app = express();
const port = 8000;
const hadoopClusterHomePath = '/home/path/to/your/directory';
const clusterName = 'clusterName';
const projectId = 'projectID';
const zone = 'zone'
const clusterUserName = 'clusterUserName'

app.use(bodyParser.json());

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    const results = [];
    let id = 1;

    for await (const line of rl) {
        const regex = /^(hdfs:\/\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/)(\S+)\t(\S+)\t(\S+)/;

        if (regex.test(line)) {
            const matches = line.match(regex);
            const folder = matches[1];
            const file_name = matches[2];
            const term = matches[3];
            const frequency = parseInt(matches[4]);

            // Check if the folder's last directory is "input"
            const folderPath = new URL(folder).pathname;
            const lastFolder = folderPath.split('/').slice(-2, -1)[0];

            if (lastFolder === 'input') {
                results.push({
                    id: id++,
                    folder,
                    file_name,
                    term,
                    frequency,
                });
            }

            // Sort the results by frequency, largest to smallest
            results.sort((a, b) => b.frequency - a.frequency);
        }
    }

    return results;
}


// helper function to create input and output directories on HDFS
const createHDFSDirectory = (directory) => {
    return new Promise((resolve, reject) => {
        const createDirArgs = [
            'compute',
            'ssh',
            '--zone',
            zone,
            clusterName,
            '--project',
            projectId,
            '--',
            'bash', '-c', `
          hdfs dfs -mkdir -p ${directory}
        `,
        ];
        const createDirRes = spawnSync('gcloud', createDirArgs);
        if (createDirRes.error) {
            console.error(`Error creating HDFS directory: ${createDirRes.error.message}`);
            reject(createDirRes.error);
        } else {
            console.log(`HDFS directory created: ${directory}`);
            resolve();
        }
    });
};

// Configure multer to handle file uploads
const upload = multer({
    storage: multer.memoryStorage(),
});

// Enable CORS for all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Define an API endpoint to upload files HDFS on GCP cluster and run MapReduce
app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        const localTempFolder = './temp';

        if (!fs.existsSync(localTempFolder)) {
            fs.mkdirSync(localTempFolder);
        }

        for (const file of files) {
            fs.writeFileSync(`${localTempFolder}/${file.originalname}`, file.buffer);
        }
        // Transfer files to master node using scp
        for (const file of files) {
            const scpArgs = [
                'compute',
                'scp',
                '--zone',
                zone,
                `${localTempFolder}/${file.originalname}`,
                `hadoop-cluster-m:/home/${userName}/files/${file.originalname}`,
                '--project',
                projectId,
            ];
            const result = await spawnSync('gcloud', scpArgs);
            console.log(`Transferring ${file.originalname}:`, result.stdout.toString(), result.stderr.toString());
        }

        // transferring data files done
        console.log("transferring input files done...");
        // Run the MapReduce job
        (async () => {
            // Create the necessary directories in HDFS
            await createHDFSDirectory(`/user/${userName}/input`);
            // Upload the data files to HDFS
            const uploadFilesArgs = [
                'compute',
                'ssh',
                '--zone',
                zone,
                clusterName,
                '--project',
                projectId,
                '--',
                'bash', '-c', `
      hdfs dfs -put ${hadoopClusterHomePath}/files/* /user/${userName}/input
    `,
            ];
            const uploadResult = await spawnSync('gcloud', uploadFilesArgs);
            console.log(`Uploading Files to HDFS:`, uploadResult.stdout.toString(), uploadResult.stderr.toString());
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
            var dateTime = time + '-' + date;
            const hadoopArgs = [
                'compute',
                'ssh',
                '--zone',
                zone,
                clusterName,
                '--project',
                projectId,
                '--',
                'bash', '-c', `
                cd ../${clusterUserName}
                hadoop jar hadoop-streaming.jar \
                -D mapreduce.map.debug.script=true \
                -D mapreduce.reduce.debug.script=true \
                -D mapreduce.job.reduces=2 \
                -D mapreduce.job.output.always.create.directory=true \
                -files mapper.py,reducer.py \
                -input ${hadoopClusterHomePath}/* \
                -output ${hadoopClusterHomePath}/output-${dateTime} \
                -mapper mapper.py \
                -reducer reducer.py && wait
                `
            ];
            const result = await spawnSync('gcloud', hadoopArgs);
            console.log(`Completing MapReduce Jobs:`, result.stdout.toString(), result.stderr.toString());

            // Transfer output files from HDFS to the local system on the cluster
            const transferOutputToLocalArgs = [
                'compute',
                'ssh',
                '--zone',
                zone,
                clusterName,
                '--project',
                projectId,
                '--',
                'bash', '-c', `
                    hdfs dfs -get ${hadoopClusterHomePath}/output-${dateTime} /home/${userName}/output-${dateTime}
                `,
            ];
            const transferOutputToLocalRes = await spawnSync('gcloud', transferOutputToLocalArgs);
            console.log(`Transferring Output Files to Local System on the Cluster:`, transferOutputToLocalRes.stdout.toString(), transferOutputToLocalRes.stderr.toString());

            // Download the output files to a local directory
            const downloadArgs = [
                'compute',
                'scp',
                '--recurse',
                '--zone',
                zone,
                `${clusterName}:/home/${userName}/output-${dateTime}`,
                `./output/output-${dateTime}`,
                '--project',
                'project1-376508',
            ];
            const downloadRes = await spawnSync('gcloud', downloadArgs);
            console.log(`Downloading Output Files:`, downloadRes.stdout.toString(), downloadRes.stderr.toString());

            console.log("Preparing responses...")
            const outputDirPath = `./output/output-${dateTime}`;

            fs.readdir(outputDirPath, (err, files) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                const resultsPromises = files.map((file) => processFile(`${outputDirPath}/${file}`));

                Promise.all(resultsPromises)
                    .then((resultsArr) => {
                        const results = [].concat(...resultsArr); // Flatten the array
                        res.json(results);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    });
            });
        })();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
