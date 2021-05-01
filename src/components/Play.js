import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
});

export const Play = () => {
  const classes = useStyles();

  const onClick = () => {
      console.log('play clcik')
  }

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
          Choose a weapon
        </Typography>
        <Select>
          <MenuItem value={10}>Rock</MenuItem>
          <MenuItem value={20}>Paper</MenuItem>
          <MenuItem value={30}>Scissors</MenuItem>
          <MenuItem value={40}>Spock</MenuItem>
          <MenuItem value={50}>Lizard</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={onClick}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};
