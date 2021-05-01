import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
  });

export const Connect = () => {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Connect your Metamask Wallet to Begin
            </Typography>
            <Button variant="contained" color="primary">
              Connect
            </Button>
          </CardContent>
        </Card>
      );
}