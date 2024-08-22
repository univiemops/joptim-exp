import React from "react";
import { sumOfArray } from "@/utils/helperFunctions";
import styles from "./Tiles.module.css";

interface PropsWorkerTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
  cmap: Array<string>;
  mini?: boolean;
}

export const WorkerTile: React.FC<PropsWorkerTile> = (props) => {
  const { size, activeTasks, tasks, cmap, mini } = props;

  const remainingSize =
    size - sumOfArray(activeTasks.map((task) => tasks[task]));
  let opacity: number = 1;
  let filter: string = "";
  if (remainingSize === 0) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={mini ? styles.worker_tile_mini : styles.worker_tile}>
        <div
          style={{ height: String(size).concat("%") }}
          className={
            mini
              ? styles.worker_tile_inner_capacity_mini
              : styles.worker_tile_inner_capacity
          }
        ></div>
        <div
          className={
            mini
              ? styles.worker_tile_load_container_mini
              : styles.worker_tile_load_container
          }
        >
          {activeTasks.map((task, idx) => (
            <div
              key={idx}
              className={
                mini ? styles.worker_tile_load_mini : styles.worker_tile_load
              }
              style={{
                minHeight: String(tasks[task]).concat("%"),
                backgroundColor: cmap[task],
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
