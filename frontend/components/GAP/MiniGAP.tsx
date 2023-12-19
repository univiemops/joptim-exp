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

const MiniGAP: React.FC<GAPProps> = ({
  loading,
  tasks,
  assignments,
  workers,
  handleTileClick,
}) => {
  return (
    <div className="Game-container-outer-mini">
      <div className="Game-container-outer-left-mini">
        <div className="Game-container-outer-left-empty-mini"></div>
        <div className="Game-container-ylabels-mini">
          <EmptyTileYMini />
          <div className="Game-container-ylabels-inner-mini">
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
      <div className="Game-container-outer-right-mini">
        <div className="Game-container-xlabels-mini">
          <EmptyTileXMini />
          <div className="Game-container-xlabels-inner-mini">
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
        <div className="Game-container-inner-mini">
          <div className="Game-container-inner-left-mini">
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
          <div className="Game-container-inner-middle">
            <div className="Tile-row-workers">
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
            <div className="Tile-container">
              {tasks.map((_, i) => (
                <div key={i} className="Tile-row">
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
