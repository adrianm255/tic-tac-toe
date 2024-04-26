import React from "react";
import Square from "./Square";

interface Props {
  squares: string[];
  winningLine: number[] | null;
  onClick: (i: number) => void;
}

const Board: React.FC<Props> = ({ squares, winningLine, onClick }) => {
  return (
    <div className="game-board">
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} value={squares[i]} onClick={() => onClick(i)} isWinning={winningLine?.includes(i)} />
      ))}
    </div>
  );
};

export default Board;
