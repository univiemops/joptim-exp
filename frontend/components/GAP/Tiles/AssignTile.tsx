import React from "react";
import styles from "./Tiles.module.css";

interface PropsAssignTile {
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const AssignTile: React.FC<PropsAssignTile> = (props) => {
  const { onClick, active } = props;

  return (
    <div className={styles.tile} onClick={onClick}>
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

export const AssignTileMini: React.FC<PropsAssignTile> = (props) => {
  const { onClick, active } = props;

  return (
    <div className={styles.tile_mini} onClick={onClick}>
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
