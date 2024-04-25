import React, { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import Player from "./Player";
import { useGame } from "../contexts/GameContext";

const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const isBoardFull = (squares: (string | null)[]) => {
  return squares.every(square => square !== null);
}

const getBestMove = (squares: (string | null)[], isMaximizing: boolean, depth: number, maxDepth: number) => {
  const winner = calculateWinner(squares);
  if (winner === 'X') return { score: -10 };
  else if (winner === 'O') return { score: 10 };
  else if (isBoardFull(squares)) return { score: 0 };

  if (depth === maxDepth) return { score: 0 };

  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestIndex = -1;

  squares.forEach((square, index) => {
    if (square === null) {
      squares[index] = isMaximizing ? 'O' : 'X';
      const move = getBestMove(squares, !isMaximizing, depth + 1, maxDepth);
      squares[index] = null;
      if (isMaximizing ? move.score > bestScore : move.score < bestScore) {
        bestScore = move.score;
        bestIndex = index;
      }
    }
  });

  return { index: bestIndex, score: bestScore };
}

const getMediumMove = (squares: (string | null)[]) => {
  return getBestMove(squares, true, 0, 1);
}

const getHardMove = (squares: (string | null)[]) => {
  return getBestMove(squares, true, 0, Infinity);
}

const getRandomMove = (squares: (string | null)[]) => {
  const emptyIndexes = squares.map((s, idx) => s === null ? idx : null).filter(idx => idx !== null);
  
  if (emptyIndexes.length > 0) {
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      return { index: randomIndex };
  }
  
  return { index: -1 };
}

const Game: React.FC = () => {
  const { options, quitGame } = useGame();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(options.startingSymbol === "X");
  const [firstTurn, setFirstTurn] = useState(options.startingSymbol);

  const winner = calculateWinner(squares);
  const isGameOver = !!winner || isBoardFull(squares);
  const status = isGameOver ? (winner ? `Winner: ${winner}` : 'Draw') : '';

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(firstTurn !== "X");
    setFirstTurn(firstTurn === "X" ? "O" : "X");
  };

  const aiMove = () => {
    let move: any;
    switch (options.aiDifficulty) {
      case 'Easy':
          move = getRandomMove(squares);
          break;
      case 'Medium':
          move = getMediumMove(squares);
          break;
      case 'Hard':
          move = getHardMove(squares);
          break;
      default:
          move = getRandomMove(squares);
  }
  
    if (move.index !== -1) {
      squares[move.index] = 'O';
      setSquares(squares);
      setXIsNext(!xIsNext);
    }
  };

  const handleClick = (i: number) => {
    // TODO refactor
    if (options.gameMode === "Singleplayer" && !xIsNext) return;
    if (calculateWinner(squares) || squares[i]) return;
    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    let timeout: number | undefined;
    if (options.gameMode === "Singleplayer" && !xIsNext) {
      timeout = setTimeout(() => {
        if (!isGameOver) aiMove();
      }, 500);
    } else if (options.timePerMove > 0) {
      timeout = setTimeout(() => {
        if (!isGameOver) setXIsNext(!xIsNext);
      }, options.timePerMove * 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    }
  }, [xIsNext, isGameOver]);

  return (
    <div className="game">
      <Board squares={squares} onClick={handleClick} />
      <div className="game-info">
        {isGameOver && (<div>
          <button onClick={resetGame}>Play again</button>
          <button onClick={quitGame}>Quit</button>
        </div>)}
        <div>{status}</div>
        <div>
          <Player name="Player 1" symbol="X" isActive={xIsNext && !isGameOver} />
          <Player name="Player 2" symbol="O" isActive={!xIsNext && !isGameOver} />
        </div>
      </div>
    </div>
  );
};

export default Game;
