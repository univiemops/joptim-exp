import React from "react";
import styles from "./Tiles.module.css";

interface PropsTaskTile {
  size: number;
  color: string;
  assigned: boolean;
}

export const TaskTile: React.FC<PropsTaskTile> = (props) => {
  const { size, color, assigned } = props;
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
      <div className={styles.task_tile}>
        <div
          style={{
            width: String(size).concat("%"),
            backgroundColor: color,
            filter: filter,
            opacity: opacity,
          }}
          className={styles.task_tile_inner}
        ></div>
      </div>
    </div>
  );
};
