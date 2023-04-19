const styles = {
  marginTop: {
    marginTop: "2rem",
  },
  marginTopUpload: {
    marginTop: "6rem",
  },
  marginTopHeader: {
    marginTop: "8rem",
  },
  marginBottom: {
    marginBottom: "2rem",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  alignCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  labelButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  center: {
    // transform: "translateY(50px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "gray",
    color: "white",
    padding: "10px",
    width: "200px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  inputBox: {
    width: "200px",
    height: "30px",
    marginTop: "6rem",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  spinner: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "10px solid #ccc",
    borderTopColor: "#555",
    animation: "spinner 0.8s infinite linear",
    WebkitAnimation: "spinner 0.8s infinite linear",
  },
  "@keyframes spinner": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
};

export default styles;
