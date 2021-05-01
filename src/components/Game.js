import React, {useState} from "react";
import { Connect } from "./Connect";
import { Play } from "./Play";

export const Game = () => {
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    setConnected(true);
  };

  return connected ? (
    <Play></Play>
  ) : (
    <Connect onConnectClicked={connectWallet}></Connect>
  );
};
