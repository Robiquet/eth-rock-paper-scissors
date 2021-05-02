import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export const Options = (props) => {
  const classes = useStyles();

  const onNew = () => {
    props.onNewClicked();
  };
  const onJoin = () => {
    props.onJoinClicked();
  };
  const onRejoin = () => {
    props.onRejoinClicked();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          ROCK - PAPER - SCISSORS - SPOCK - LIZARD
        </Typography>
        <Button variant="contained" color="primary" onClick={onNew}>
          New Game
        </Button>
        <Button variant="contained" color="primary" onClick={onJoin}>
          Join Game
        </Button>
        <Button variant="contained" color="primary" onClick={onRejoin}>
          Rejoin Game
        </Button>
      </CardContent>
    </Card>
  );
};
