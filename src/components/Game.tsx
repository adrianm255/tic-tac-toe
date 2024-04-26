import React, { useEffect, useState } from "react";
import Board from "./Board";
import Player from "./Player";
import { useGame } from "../contexts/GameContext";

const Game: React.FC = () => {
  const { options, quitGame } = useGame();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(options.startingSymbol === "X");
  const [firstTurn, setFirstTurn] = useState(options.startingSymbol);

  const { winner, winningLine } = calculateWinner(squares);
  const isGameOver = !!winner || isBoardFull(squares);
  const winningPlayer = winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)';
  const status = isGameOver ? (winner ? `${winningPlayer} wins!` : 'Tie!') : '';

  const isComputerToMove = () => options.gameMode === "Singleplayer" && !xIsNext;

  useEffect(() => {
    let timeout: number | undefined;
    if (isComputerToMove()) {
      timeout = setTimeout(() => {
        if (!isGameOver) computerMove();
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

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(firstTurn !== "X");
    setFirstTurn(firstTurn === "X" ? "O" : "X");
  };

  const computerMove = () => {
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
      const nextSquares = [...squares];
      nextSquares[move.index] = 'O';
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  };

  const handleClick = (i: number) => {
    if (isComputerToMove() || isGameOver || squares[i]) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="game">
      <Board squares={squares} onClick={handleClick} winningLine={winningLine} />
      <div className="game-info">
        <div className="player-info">
          <Player name="Player 1" symbol="X" isActive={xIsNext && !isGameOver} timePerMove={options.timePerMove} />
          <Player name="Player 2" symbol="O" isActive={!xIsNext && !isGameOver} timePerMove={options.timePerMove} />
        </div>
      </div>
      {isGameOver && (<>
        <div className="game-status">{status}</div>
        <div className="game-controls">
          <button className="btn btn-primary" onClick={resetGame}>Play again</button>
          <button className="btn btn-secondary" onClick={quitGame}>Quit</button>
        </div>
      </>)}
    </div>
    
  );
};

const calculateWinner = (squares: (string | null)[]): { winner: string | null, winningLine: number[] | null } => {
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
      return {
        winner: squares[a],
        winningLine: lines[i]
      };
    }
  }
  return {
    winner: null,
    winningLine: null
  };
}

const isBoardFull = (squares: (string | null)[]) => {
  return squares.every(square => square !== null);
}

const getBestMove = (squares: (string | null)[], isMaximizing: boolean, depth: number, maxDepth: number) => {
  const { winner } = calculateWinner(squares);
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

export default Game;
