import React from "react";
import cmap from "../../constants/colors";
import {
  EmptyTile,
  EmptyTileXLeft,
  EmptyTileXRight,
  EmptyTileY,
} from "./Tiles/EmptyTiles";
import { TaskTile } from "./Tiles/TaskTile";
import { WorkerTile } from "./Tiles/WorkerTile";
import { XLabelTile, YLabelTile } from "./Tiles/LabelTiles";
import { AssignTile } from "./Tiles/AssignTile";
import { GAPProps } from "./types";
import styles from "./GAP.module.css";

const GAP: React.FC<GAPProps> = ({
  tasks,
  assignments,
  workers,
  handleTileClick,
  freeze,
  icons,
}) => {
  return (
    <div className={styles.outer}>
      <div className={styles.outer_left}>
        <div className={styles.outer_left_empty}></div>
        <div className={styles.ylabels}>
          <EmptyTileY />
          <div
            className={styles.ylabels_inner}
          >
            {tasks.map((size, idx) => {
              const assigned =
                assignments.filter((innerArray) => innerArray[0] === idx)
                  .length === 1;
              return (
                <YLabelTile
                  key={idx}
                  size={size}
                  color={cmap[idx]}
                  assigned={assigned}
                  icons={icons}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.outer_right}>
        <div className={styles.xlabels}>
          <EmptyTileXLeft />
          <div
            className={styles.xlabels_inner}
          >
            {workers.map((size, i) => {
              const activeTasks = assignments
                .filter((innerArray) => innerArray[1] === i)
                .map((innerArray) => innerArray[0]);
              return (
                <XLabelTile
                  key={i}
                  size={size}
                  activeTasks={activeTasks}
                  tasks={tasks}
                  icons={icons}
                />
              );
            })}
          </div>
          <EmptyTileXRight
            assignments={assignments}
            tasks={tasks}
            workers={workers}
          />
        </div>
        <div className={styles.inner}>
          <div
            className={styles.inner_left}
          >
            <EmptyTile />
            {tasks.map((size, idx) => {
              const assigned =
                assignments.filter((innerArray) => innerArray[0] === idx)
                  .length === 1;
              return (
                <TaskTile
                  key={idx}
                  size={size}
                  color={cmap[idx]}
                  assigned={assigned}
                />
              );
            })}
          </div>
          <div className={styles.inner_middle}>
            <div
              className={styles.tile_row_workers}
            >
              {workers.map((size, i) => {
                const activeTasks = assignments
                  .filter((innerArray) => innerArray[1] === i)
                  .map((innerArray) => innerArray[0]);
                return (
                  <WorkerTile
                    key={i}
                    size={size}
                    activeTasks={activeTasks}
                    tasks={tasks}
                  />
                );
              })}
            </div>
            <div className={styles.tile_container}>
              {tasks.map((_, i) => (
                <div
                  key={i}
                  className={styles.tile_row}
                >
                  {workers.map((_, j) => {
                    let active = false;
                    if (
                      assignments.findIndex((a) => a[0] === i && a[1] === j) !==
                      -1
                    ) {
                      active = true;
                    }

                    return (
                      <AssignTile
                        key={j}
                        active={active}
                        onClick={(e) => handleTileClick?.(e, [i, j])}
                        freeze={freeze}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.inner_right}></div>
        </div>
      </div>
    </div>
  );
};

export default GAP;
