import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  button: {
    "margin-right": 10,
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
        <Button
          variant="contained"
          color="primary"
          onClick={onNew}
          className={classes.button}
        >
          New Game
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onJoin}
          className={classes.button}
        >
          Join Game
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onRejoin}
          className={classes.button}
        >
          Rejoin Game
        </Button>
      </CardContent>
    </Card>
  );
};
