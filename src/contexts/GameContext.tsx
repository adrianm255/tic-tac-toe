import React, { createContext, useContext, useState, ReactNode } from "react";
import { ComputerDifficulty, GameMode, GameSettings } from "../types/game";

interface GameContextType {
  options: GameSettings;
  setOptions: React.Dispatch<React.SetStateAction<GameSettings>>;
  gameStarted: boolean;
  startGame: () => void;
  quitGame: () => void;
}

const defaultOptions: GameSettings = {
  gameMode: GameMode.Singleplayer,
  startingSymbol: "X",
  timePerMove: 0,
  aiDifficulty: ComputerDifficulty.Easy
};

const GameContext = createContext<GameContextType>({
  options: defaultOptions,
  setOptions: () => {},
  gameStarted: false,
  startGame: () => {},
  quitGame: () => {}
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [options, setOptions] = useState<GameSettings>(defaultOptions);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const quitGame = () => {
    setGameStarted(false);
  };

  return (
    <GameContext.Provider value={{ options, setOptions, gameStarted, startGame, quitGame }}>
      {children}
    </GameContext.Provider>
  );
};
