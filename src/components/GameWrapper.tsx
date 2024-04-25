import React from "react";
import { useGame } from "../contexts/GameContext";
import Game from "./Game";
import GameOptions from "./GameOptions";

const GameWrapper: React.FC = () => {
  const { gameStarted } = useGame();

  if (gameStarted) {
    return <Game />;
  } else {
    return <GameOptions />;
  }
};

export default GameWrapper;
