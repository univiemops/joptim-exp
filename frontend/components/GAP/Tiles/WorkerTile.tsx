import React from "react";
import { sumOfArray } from "@/utils/helperFunctions";
import cmap from "@/constants/colors";
import styles from "./Tiles.module.css";

interface PropsWorkerTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

export const WorkerTile: React.FC<PropsWorkerTile> = (props) => {
  const { size, activeTasks, tasks } = props;

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
      <div className={styles.worker_tile}>
        <div
          style={{ height: String(size).concat("%") }}
          className={styles.worker_tile_inner_capacity}
        ></div>
        <div className={styles.worker_tile_load_container}>
          {activeTasks.map((task, idx) => (
            <div
              key={idx}
              className={styles.worker_tile_load}
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

export const WorkerTileMini: React.FC<PropsWorkerTile> = (props) => {
  const { size, activeTasks, tasks } = props;

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
      <div className={styles.worker_tile_mini}>
        <div
          style={{ height: String(size).concat("%") }}
          className={styles.worker_tile_inner_capacity}
        ></div>
        <div className={styles.worker_tile_load_container}>
          {activeTasks.map((task, idx) => (
            <div
              key={idx}
              className={styles.worker_tile_load}
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
