const styles = {
  card: {
    border: "2px solid #aaaaaa",
    borderRadius: "8px",
    width: "100%",
  },
  frame: {
    position: "relative",
    width: "100%",
    height: "0",
    paddingTop: "56.2500%",
    paddingBottom: "0",
    overflow: "hidden",
    willChange: "transform",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    border: "none",
    padding: "0",
    margin: "0",
  },
  bar: {
    display: "flex",
    width: "100%",
  },
  info: {
    flex: "1 2 auto",
    padding: "0px 0.4em",
    overflowWrap: "anywhere",
  },
  type: {
    flex: "0 0 7em",
    margin: "auto 0.5em",
    height: "1.5em",
    border: "1px solid #aaaaaa",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
};

export default styles;
