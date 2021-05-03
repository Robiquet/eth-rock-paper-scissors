import "./App.css";
import { Game } from "./components/Game";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const handleLoaderChange = (loading) => {
    setIsLoading(loading);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Game loaderChange={handleLoaderChange}></Game>
      </header>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
