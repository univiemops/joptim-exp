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
  mini
}) => {
  return (
    <div className={mini ? styles.outer_mini : styles.outer}>
      <div className={mini ? styles.outer_left_mini : styles.outer_left}>
        <div className={mini ? styles.outer_left_empty_mini : styles.outer_left_empty}></div>
        <div className={mini ? styles.ylabels_mini : styles.ylabels}>
          <EmptyTileY mini={mini} />
          <div className={mini ? styles.ylabels_inner_mini : styles.ylabels_inner}>
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
                  mini={mini}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={mini ? styles.outer_right_mini : styles.outer_right}>
        <div className={mini ? styles.xlabels_mini : styles.xlabels}>
          <EmptyTileXLeft mini={mini} />
          <div className={mini ? styles.xlabels_inner_mini : styles.xlabels_inner}>
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
                  mini={mini}
                />
              );
            })}
          </div>
          <EmptyTileXRight
            assignments={assignments}
            tasks={tasks}
            workers={workers}
            mini={mini}
          />
        </div>
        <div className={mini ? styles.inner_mini : styles.inner}>
          <div className={mini ? styles.inner_left_mini : styles.inner_left}>
            <EmptyTile mini={mini} />
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
                  mini={mini}
                />
              );
            })}
          </div>
          <div className={mini ? styles.inner_middle_mini : styles.inner_middle}>
            <div className={mini ? styles.tile_row_workers_mini : styles.tile_row_workers}>
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
                    mini={mini}
                  />
                );
              })}
            </div>
            <div className={mini ? styles.tile_container_mini : styles.tile_container}>
              {tasks.map((_, i) => (
                <div key={i} className={mini ? styles.tile_row_mini : styles.tile_row}>
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
                        mini={mini}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className={mini ? styles.inner_right_mini : styles.inner_right}></div>
        </div>
      </div>
    </div>
  );
};

export default GAP;
