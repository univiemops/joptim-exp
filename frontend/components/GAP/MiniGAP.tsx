import React from "react";
import cmap from "../../constants/colors";
import {
  EmptyTileYMini,
  EmptyTileXMini,
  EmptyTileMini,
} from "./Tiles/EmptyTiles";
import { TaskTileMini } from "./Tiles/TaskTile";
import { WorkerTileMini } from "./Tiles/WorkerTile";
import { XLabelTileMini, YLabelTileMini } from "./Tiles/LabelTiles";
import { AssignTileMini } from "./Tiles/AssignTile";
import { GAPProps } from "./types";
import styles from "./GAP.module.css";

const MiniGAP: React.FC<GAPProps> = ({
  loading,
  tasks,
  assignments,
  workers,
  handleTileClick,
}) => {
  return (
    <div className={styles.container_outer_mini}>
      <div className={styles.container_outer_left_mini}>
        <div className={styles.container_outer_left_empty_mini}></div>
        <div className={styles.container_ylabels_mini}>
          <EmptyTileYMini />
          <div className={styles.container_ylabels_inner_mini}>
            {tasks.map((size, idx) => {
              const assigned =
                assignments.filter((innerArray) => innerArray[0] === idx)
                  .length === 1;
              return (
                <YLabelTileMini
                  key={idx}
                  size={size}
                  color={cmap[idx]}
                  assigned={assigned}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.container_outer_right_mini}>
        <div className={styles.container_xlabels_mini}>
          <EmptyTileXMini />
          <div className={styles.container_xlabels_inner_mini}>
            {workers.map((size, i) => {
              const activeTasks = assignments
                .filter((innerArray) => innerArray[1] === i)
                .map((innerArray) => innerArray[0]);
              return (
                <XLabelTileMini
                  key={i}
                  size={size}
                  activeTasks={activeTasks}
                  tasks={tasks}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.container_inner_mini}>
          <div className={styles.container_inner_left_mini}>
            <EmptyTileMini />
            {tasks.map((size, idx) => {
              const assigned =
                assignments.filter((innerArray) => innerArray[0] === idx)
                  .length === 1;
              return (
                <TaskTileMini
                  key={idx}
                  size={size}
                  color={cmap[idx]}
                  assigned={assigned}
                />
              );
            })}
          </div>
          <div className={styles.container_inner_middle}>
            <div className={styles.tile_row_workers}>
              {workers.map((size, i) => {
                const activeTasks = assignments
                  .filter((innerArray) => innerArray[1] === i)
                  .map((innerArray) => innerArray[0]);
                return (
                  <WorkerTileMini
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
                <div key={i} className={styles.tile_row}>
                  {workers.map((_, j) => {
                    let active = false;
                    if (
                      assignments.findIndex((a) => a[0] === i && a[1] === j) !==
                      -1
                    ) {
                      active = true;
                    }

                    return (
                      <AssignTileMini
                        key={j}
                        active={active}
                        onClick={(e) => handleTileClick(e, [i, j])}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGAP;
