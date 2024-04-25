import React from "react";
import { useGame } from "../contexts/GameContext";

const GameOptions: React.FC = () => {
  const { options, setOptions, startGame } = useGame();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame();
  };

  const setOption = (key: string, value: any) => {
    setOptions((prevOptions: any) => {
      return { ...prevOptions, [key]: value }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Mode:
        <select value={options.gameMode} onChange={e => setOption('gameMode', e.target.value as "Singleplayer" | "2-Player")}>
          <option value="Singleplayer">Singleplayer</option>
          <option value="2-Player">2-Player</option>
        </select>
      </label>
      <br />
      <label>
        Starting Symbol:
        <select value={options.startingSymbol} onChange={e => setOption('startingSymbol', e.target.value as "X" | "O")}>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </label>
      <br />
      {options.gameMode === "Singleplayer" && (
        <label>
          AI Difficulty:
          <select value={options.aiDifficulty} onChange={e => setOption('aiDifficulty', e.target.value as "Easy" | "Medium" | "Hard")}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
      )}
      <br />
      <label>
        Time per Move:
        <select value={options.timePerMove} onChange={e => setOption('timePerMove', Number(e.target.value))}>
          <option value={1}>1 second</option>
          <option value={3}>3 seconds</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          <option value={0}>Unlimited</option>
        </select>
      </label>
      <br />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default GameOptions;
