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
  //     enum Move {Null, Rock, Paper, Scissors, Spock, Lizard} // Possible moves. Note that if the parity of the moves is the same the lower one wins, otherwise the higher one.
  const salt = 65465412;
  const weapons = [
    {
      hash:
        "0xb1e87fb1565405af97dd4c11307e39fe0e30715988296cf97d5034437f4c4a4c",
      value: 1,
      text: "Rock",
    },
    {
      hash:
        "0xc2e1550c96845c5102419882750ec416af5c1db876759b9f59961d733122a5c3",
      value: 2,
      text: "Paper",
    },
    {
      hash:
        "0x4941ee0402af2d2db0d805cde613f4d6d689b9fecfaf52d37f439011a5542eed",
      value: 3,
      text: "Scissors",
    },
    {
      hash:
        "0x8d879329d9314a21b26537aa4494cf1bfa0005a92e2c0ba72500cce3258e5139",
      value: 4,
      text: "Spock",
    },
    {
      hash:
        "0xc16894a95b36f88e9a379bc2865d59378f23db5abe7736602e8197c38b7980a5",
      value: 5,
      text: "Lizard",
    },
  ];

  const submitted = (event) => {
    event.preventDefault();
    //TODO: handle forms for other scenerios too
    let formValue;
    if (props.rejoin === true) {
      formValue = {
        address: event.target[0].value,
      };
    } else {
      formValue = {
        weapon: event.target[0].value,
        weaponHash: weapons.find((w) => w.value.toString() === event.target[0].value).hash,
        address: event.target[1].value,
        stake: event.target[2].value,
      };
    }
    props.formSubmitted(formValue);
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
                {weapons.map((w, idx) => (
                  <MenuItem key={idx} value={w.value}>
                    {w.text}
                  </MenuItem>
                ))}
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
