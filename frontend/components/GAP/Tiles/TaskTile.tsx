import React from "react";
import styles from "./Tiles.module.css";

interface PropsTaskTile {
  size: number;
  color: string;
  assigned: boolean;
  mini?: boolean;
}

export const TaskTile: React.FC<PropsTaskTile> = (props) => {
  const { size, color, assigned, mini } = props;
  let opacity: number = 1;
  let filter: string = "";
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className={mini ? styles.task_tile_mini : styles.task_tile}>
        <div
          style={{
            width: String(size).concat("%"),
            backgroundColor: color,
            filter: filter,
            opacity: opacity,
          }}
          className={mini ? styles.task_tile_inner_mini : styles.task_tile_inner}
        ></div>
      </div>
    </div>
  );
};
