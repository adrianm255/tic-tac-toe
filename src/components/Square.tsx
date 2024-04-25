import React from "react";

interface Props {
  value: string;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
