import "./App.css";
import React from "react";

const m = 4;
const n = 4;

const cmap = ["#0063A6", "#A71C49", "#DD4814", "#F6A800", "pink"];

const task_sizes = Array.from(
  { length: n },
  () => 10 * Math.floor(Math.random() * 10)
);

const agent_sizes = Array.from(
  { length: n },
  () => 10 * Math.floor(Math.random() * 10)
);

const App = () => {
  const [assignments, setAssignments] = React.useState([]);

  const handleTileClick = (coordinates) => {
    let newAssignments = [...assignments];
    let index = newAssignments.findIndex(
      (a) => a[0] === coordinates[0] && a[1] === coordinates[1]
    );
    if (index === -1) {
      newAssignments.push(coordinates);
    } else {
      newAssignments.splice(index, 1);
    }
    setAssignments(newAssignments);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Allocation matrix</h2>
        <p>Press F5 for a new task</p>
        <div className="Game-container">
          <div className="Game-container-left">
            <EmptyTile />
            {task_sizes.map((size, idx) => (
              <TaskTile key={idx} size={size} color={cmap[idx]} />
            ))}
          </div>
          <div className="Game-container-right">
            <div className="Tile-row">
              {agent_sizes.map((size, i) => {
                const activeTasks = assignments
                  .filter((innerArray) => innerArray[1] === i)
                  .map((innerArray) => innerArray[0]);

                return (
                  <AgentTile key={i} size={size} activeTasks={activeTasks} />
                );
              })}
            </div>
            <div className="Tile-container">
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="Tile-row">
                  {Array.from({ length: m }).map((_, j) => {
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
                        onClick={() => handleTileClick([i, j])}
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

const AssignTile = (props) => {
  const { onClick, active } = props;

  return (
    <div className="Tile" onClick={onClick}>
      {active && (
        <svg className="SVG-circle">
          <circle
            cx="40"
            cy="40"
            r="20"
            stroke="black"
            strokeWidth="3"
            fill="lightgray"
          />
        </svg>
      )}
    </div>
  );
};

const TaskTile = (props) => {
  const { size, color } = props;
  return (
    <div className="Task-tile">
      <div
        style={{ width: String(size).concat("%"), backgroundColor: color }}
        className="Task-tile-inner"
      ></div>
    </div>
  );
};

const AgentTile = (props) => {
  const { size, activeTasks } = props;

  return (
    <div className="Agent-tile">
      <div
        style={{ height: String(size).concat("%") }}
        className="Agent-tile-inner-capacity"
      ></div>
      <div className="Agent-tile-load-container">
        {activeTasks.map((task, idx) => (
          <div
            key={idx}
            className="Agent-tile-load"
            style={{
              minHeight: String(task_sizes[task]).concat("%"),
              backgroundColor: cmap[task],
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const EmptyTile = () => {
  return <div className="Empty-tile"></div>;
};

export default App;
