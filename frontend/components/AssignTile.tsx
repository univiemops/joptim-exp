import React from "react";

interface PropsAssignTile {
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AssignTile: React.FC<PropsAssignTile> = (props) => {
  const { onClick, active } = props;

  return (
    <div className="Tile" onClick={onClick}>
      {active && (
        <svg className="SVG-circle">
          <circle
            cx="50%"
            cy="50%"
            r="20%"
            stroke="black"
            strokeWidth="4%"
            fill="lightgray"
          />
        </svg>
      )}
    </div>
  );
};

export default AssignTile;
