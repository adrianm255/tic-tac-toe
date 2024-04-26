import React from "react";

interface Props {
  value: string;
  isWinning?: boolean;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ value, isWinning, onClick }) => {
  return (
    <button className="square" style={isWinning ? { color: 'var(--primary)' } : {}} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
