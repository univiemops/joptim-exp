import React from "react";
import styles from "./Tiles.module.css";

interface PropsAssignTile {
  active: boolean;
  freeze: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  mini?: boolean;
}

export const AssignTile: React.FC<PropsAssignTile> = (props) => {
  const { onClick, active, freeze, mini } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!freeze) {
      onClick(e);
    }
    // If freeze is true, the onClick won't trigger
  };

  return (
    <div
      className={mini ? freeze ? styles.tile_disabled_mini : styles.tile_mini : freeze ? styles.tile_disabled : styles.tile}
      onClick={handleClick}
    >
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
