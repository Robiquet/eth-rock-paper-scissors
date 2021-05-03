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
        <Typography variant="body2" component="p">
          {props.contractAddress}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onTimeout}
          className={classes.button}
        >
          Timeout
        </Button>
        {props.isPlayer1 === true ? (
          <Button
            variant="contained"
            color="primary"
            onClick={onSolve}
            className={classes.button}
          >
            Solve
          </Button>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};
