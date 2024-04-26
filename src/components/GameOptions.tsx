import React from "react";
import { useGame } from "../contexts/GameContext";
import { ComputerDifficulty, GameMode, GameSettings, TimePerMove } from "../types/game";

const GameOptions: React.FC = () => {
  const { options, setOptions, startGame } = useGame();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame();
  };

  const setOption = (key: string, value: any) => {
    setOptions((prevOptions: GameSettings) => {
      return { ...prevOptions, [key]: value }
    });
  };

  return (<>
    <h1>Tic-tac-toe</h1>
    <form onSubmit={handleSubmit}>
      <section>
        <div className="group-title">Game mode</div>
        <div className="form-group radio-group inline">
          <label className={options.gameMode === GameMode.Singleplayer ? 'checked' : ''}>
            <input
              type="radio"
              name="gameMode"
              value={GameMode.Singleplayer}
              checked={options.gameMode === GameMode.Singleplayer}
              onChange={() => setOption('gameMode', GameMode.Singleplayer)}
              style={{ display: "none" }}
            /> Singleplayer (vs Computer)
          </label>
          <label className={options.gameMode === GameMode.TwoPlayer ? 'checked' : ''}>
            <input
              type="radio"
              name="gameMode"
              value={GameMode.TwoPlayer}
              checked={options.gameMode === GameMode.TwoPlayer}
              onChange={() => setOption('gameMode', GameMode.TwoPlayer)}
              style={{ display: "none" }}
            /> 2-Player (vs Friend)
          </label>
        </div>
      </section>

      <section>
        <div className="group-title">First turn</div>
        <div className="form-group radio-group inline">
          <label className={options.startingSymbol === "X" ? 'checked' : ''}>
            <input
              type="radio"
              name="startingSymbol"
              value="X"
              checked={options.startingSymbol === "X"}
              onChange={() => setOption('startingSymbol', "X")}
            /> Player 1 (X)
          </label>
          <label className={options.startingSymbol === "O" ? 'checked' : ''}>
            <input
              type="radio"
              name="startingSymbol"
              value="O"
              checked={options.startingSymbol === "O"}
              onChange={() => setOption('startingSymbol', "O")}
            /> Player 2 (O)
          </label>
        </div>
      </section>

      {options.gameMode === "Singleplayer" && (
        <section>
          <div className="group-title">Difficulty</div>
          <div className="form-group radio-group inline">
            {Object.values(ComputerDifficulty).map((difficulty: string) => (
              <label key={difficulty} className={options.aiDifficulty === difficulty ? 'checked' : ''}>
                <input
                  type="radio"
                  name="aiDifficulty"
                  value={difficulty}
                  checked={options.aiDifficulty === difficulty}
                  onChange={() => setOption('aiDifficulty', difficulty as "Easy" | "Medium" | "Hard")}
                /> {difficulty}
              </label>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="group-title">Time per Move</div>
        <div className="form-group radio-group grid-col-3">
          {Object.values(TimePerMove).filter(value => typeof value === 'number').map((timePerMove: any) => (
            <label key={timePerMove} className={options.timePerMove === timePerMove ? 'checked' : ''}>
              <input
                type="radio"
                name="timePerMove"
                value={timePerMove}
                checked={options.timePerMove === timePerMove}
                onChange={() => setOption('timePerMove', timePerMove)}
              /> { timePerMove === 0 ? 'Unlimited' : (timePerMove === 1 ? `${timePerMove} second` : `${timePerMove} seconds`) }
            </label>
          ))}
        </div>
      </section>

      <button type="submit" className="btn btn-primary">Start Game</button>
    </form>
  </>);
};

export default GameOptions;
