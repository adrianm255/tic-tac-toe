import React from "react";

interface Props {
  name: string;
  symbol: string;
  isActive: boolean;
}

const Player: React.FC<Props> = ({ name, symbol, isActive }) => {
  return (
    <div className={`player ${isActive ? "active" : ""}`}>
      <h2>{name}</h2>
      <p>Symbol: {symbol}</p>
    </div>
  );
};

export default Player;
