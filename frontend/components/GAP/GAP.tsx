import React from "react";
import cmap from "../../constants/colors";
import { EmptyTile, EmptyTileX, EmptyTileY } from "./Tiles/EmptyTiles";
import { TaskTile } from "./Tiles/TaskTile";
import { WorkerTile } from "./Tiles/WorkerTile";
import { XLabelTile, YLabelTile } from "./Tiles/LabelTiles";
import { AssignTile } from "./Tiles/AssignTile";
import { GAPProps } from "./types";
import styles from "./GAP.module.css";

const GAP: React.FC<GAPProps> = ({
  loading,
  tasks,
  assignments,
  workers,
  handleTileClick,
  freeze,
}) => {
  return (
    <div className={styles.outer}>
      <div className={styles.outer_left}>
        <div className={styles.outer_left_empty}></div>
        <div className={styles.ylabels}>
          <EmptyTileY />
          <div
            className={styles.ylabels_inner}
            style={loading ? { opacity: 0.3 } : {}}
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
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.outer_right}>
        <div className={styles.xlabels}>
          <EmptyTileX />
          <div
            className={styles.xlabels_inner}
            style={loading ? { opacity: 0.3 } : {}}
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
                />
              );
            })}
          </div>
        </div>
        <div className={styles.inner}>
          <div
            className={styles.inner_left}
            style={loading ? { opacity: 0.3 } : {}}
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
              style={loading ? { opacity: 0.3 } : {}}
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
              {loading && <div className="loading-spinner"></div>}
              {tasks.map((_, i) => (
                <div
                  key={i}
                  className={styles.tile_row}
                  style={loading ? { opacity: 0.3 } : {}}
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
                        onClick={(e) => handleTileClick(e, [i, j])}
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
