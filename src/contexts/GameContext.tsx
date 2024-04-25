import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameSettings } from "../types/game";

interface GameOptionsContextType {
  options: GameSettings;
  setOptions: any; // TODO
  gameStarted: boolean;
  startGame: () => void;
  quitGame: () => void;
}

const defaultOptions: GameSettings = {
  gameMode: "Singleplayer",
  startingSymbol: "X",
  timePerMove: 0,
  aiDifficulty: "Easy"
};

const GameOptionsContext = createContext<GameOptionsContextType>({
  options: defaultOptions,
  setOptions: () => {},
  gameStarted: false,
  startGame: () => {},
  quitGame: () => {}
});

export const useGame = () => useContext(GameOptionsContext);

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
    <GameOptionsContext.Provider value={{ options, setOptions, gameStarted, startGame, quitGame }}>
      {children}
    </GameOptionsContext.Provider>
  );
};
