import React from "react";
import Square from "./Square";

interface Props {
  squares: string[];
  onClick: (i: number) => void;
}

const Board: React.FC<Props> = ({ squares, onClick }) => {
  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  return (
    <div className="game-board">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
};

export default Board;
