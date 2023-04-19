#!/usr/bin/env python3
import sys
import re
import string
import os

stop_words = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', "cannot", 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'either', 'else', 'enough', 'etc', 'even', 'ever', 'every', 'few',
              'for', 'from', 'further', 'get', 'gets', 'got', 'had', 'has', 'have', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'more', 'most', 'must', 'my', 'myself', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other']

punctuation_regex = re.compile('[%s]' % re.escape(string.punctuation))


def process_text(text):
    # Remove punctuation marks
    text = punctuation_regex.sub('', text)

    # Remove stop words
    words = text.lower().split()
    words = [word for word in words if word not in stop_words]

    # Return list of processed words
    return words


def main():
    # Read input from stdin
    print('Getting into main function of mapper...', file=sys.stderr)
    input_file_name = os.environ['mapreduce_map_input_file']
    print(f'Processing input file: {input_file_name}', file=sys.stderr)
    for line in sys.stdin:
        # Process the input line
        words = process_text(line)
        print(f'Processed line: {line.strip()} -> {words}', file=sys.stderr)

        # Output folder, file name, word, and count of 1 for each word in words
        for word in words:
            print(f'{input_file_name}\t{word}\t1')


if __name__ == '__main__':
    print('Before entering main function...', file=sys.stderr)
    main()
