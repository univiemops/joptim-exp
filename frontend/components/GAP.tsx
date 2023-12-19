import React from "react";
import cmap from "../constants/colors";
import { EmptyTile, EmptyTileX, EmptyTileY } from "../components/EmptyTiles";
import TaskTile from "../components/TaskTile";
import WorkerTile from "../components/WorkerTile";
import { XLabelTile, YLabelTile } from "../components/LabelTiles";
import AssignTile from "../components/AssignTile";

const GAP: React.FC<{
  loading: boolean;
  tasks: number[];
  assignments: [number, number][];
  workers: number[];
  handleTileClick: (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number]
  ) => void;
}> = ({ loading, tasks, assignments, workers, handleTileClick }) => {
  return (
    <div className="Game-container-outer">
      <div className="Game-container-outer-left">
        <div className="Game-container-outer-left-empty"></div>
        <div className="Game-container-ylabels">
          <EmptyTileY />

          <div
            className="Game-container-ylabels-inner"
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
      <div className="Game-container-outer-right">
        <div className="Game-container-xlabels">
          <EmptyTileX />
          <div
            className="Game-container-xlabels-inner"
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
        <div className="Game-container-inner">
          <div
            className="Game-container-inner-left"
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
          <div className="Game-container-inner-middle">
            <div
              className="Tile-row-workers"
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
            <div className="Tile-container">
              {loading && <div className="loading-spinner"></div>}
              {tasks.map((_, i) => (
                <div
                  key={i}
                  className="Tile-row"
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
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="Game-container-inner-right"></div>
        </div>
      </div>
    </div>
  );
};

export default GAP;
