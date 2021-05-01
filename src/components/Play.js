import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  input: {
    width: 300,
  },
  root: {
    "& > *": {
      margin: 10,
      width: "25ch",
    },
  },
});

export const Play = (props) => {
  const classes = useStyles();

  const submitted = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2].value);
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
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={submitted}
        >
          {props.rejoin ? (
            <TextField
              label="Contract Address"
              variant="filled"
              className={classes.input}
            />
          ) : (
            <>
              <TextField
                select
                label="Select a Weapon"
                variant="filled"
                className={classes.input}
              >
                <MenuItem value={10}>Rock</MenuItem>
                <MenuItem value={20}>Paper</MenuItem>
                <MenuItem value={30}>Scissors</MenuItem>
                <MenuItem value={40}>Spock</MenuItem>
                <MenuItem value={50}>Lizard</MenuItem>
              </TextField>
              <TextField
                label={
                  props.newSession ? "Opponent Address" : "Contract Address"
                }
                variant="filled"
                className={classes.input}
              />
              <TextField
                label="Ammount to stake (Ether)"
                variant="filled"
                type="number"
                className={classes.input}
              />
            </>
          )}

          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
