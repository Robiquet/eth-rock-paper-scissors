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

export const Session = (props) => {
  const classes = useStyles();

  const onTimeout = () => {
    props.onTimeoutClicked();
  };
  const onSolve = () => {
    props.onSolveClicked();
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
        <Button variant="contained" color="primary" onClick={onTimeout}>
          Timeout
        </Button>
        <Button variant="contained" color="primary" onClick={onSolve}>
          Solve
        </Button>
      </CardContent>
    </Card>
  );
};
