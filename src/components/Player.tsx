import React, { useEffect, useState } from "react";

interface Props {
  name: string;
  symbol: string;
  isActive: boolean;
  timePerMove: number;
}

const Player: React.FC<Props> = ({ name, symbol, isActive, timePerMove }) => {
  const [timeLeft, setTimeLeft] = useState(100);
  const refreshRate = 50;
  const delta = timePerMove > 0 ? (refreshRate / (timePerMove * 1000)) * 100 : 0;

  useEffect(() => {
    if (timePerMove === 0) return;
    if (isActive) {
      const interval = setInterval(() => {
        setTimeLeft(time => time - delta);
      }, refreshRate);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(100);
    }
  }, [isActive]);

  return (
    <div className={`player ${isActive ? "active" : ""}`}>
      <div className="player-name">{name} ({symbol})</div>
      <div className="time-left">
        <div className="time-left-bar" style={{ width: `${timeLeft}%` }} />
      </div>
    </div>
  );
};

export default Player;
