import "./App.css";
import React from "react";

const m = 5;
const n = 5;

// university
// const cmap = ["#0063A6", "#A71C49", "#DD4814", "#F6A800"];

const cmap = [
  "#0077BB",
  "#EE7733",
  "#009988",
  "#EE3377",
  "#33BBEE",
  "#BBBBBB",
  "#CC3311",
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const task_sizes = Array.from(
  { length: n },
  () => 10 * getRandomIntInclusive(1, 9)
);

const agent_sizes = Array.from(
  { length: n },
  () => 10 * getRandomIntInclusive(1, 10)
);

const App = () => {
  const [assignments, setAssignments] = React.useState([]);

  const handleTileClick = (e, coordinates) => {
    let newAssignments = [...assignments];
    let index = newAssignments.findIndex(
      (a) => a[0] === coordinates[0] && a[1] === coordinates[1]
    );
    if (index === -1) {
      let indexOther = newAssignments.findIndex((a) => a[0] === coordinates[0]);
      const capacity = agent_sizes[coordinates[1]];
      const oldLoad = assignments
        .filter((a) => a[1] === coordinates[1])
        .map((a) => task_sizes[a[0]])
        .reduce((a, b) => a + b, 0);
      const newLoad = task_sizes[coordinates[0]];
      const limitReached = capacity - oldLoad - newLoad < 0;

      if (limitReached) {
        e.target.style.backgroundColor = "lightgray";
        setTimeout(() => {
          e.target.style.backgroundColor = "";
        }, 100);
      } else {
        newAssignments.push(coordinates);
      }
      if (indexOther !== -1 && !limitReached) {
        newAssignments.splice(indexOther, 1);
      }
    } else {
      newAssignments.splice(index, 1);
    }
    setAssignments(newAssignments);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h3>Assignment Optimization Task</h3>
        <div className="Game-container">
          <div className="Game-container-left">
            <EmptyTile />
            {task_sizes.map((size, idx) => {
              const assigned =
                assignments.filter((innerArray) => innerArray[0] == idx)
                  .length == 1;
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

const AssignTile = (props) => {
  const { onClick, active } = props;

  return (
    <div className="Tile" onClick={onClick}>
      {active && (
        <svg className="SVG-circle">
          <circle
            cx="50%"
            cy="50%"
            r="20%"
            stroke="black"
            strokeWidth="4%"
            fill="lightgray"
          />
        </svg>
      )}
    </div>
  );
};

const TaskTile = (props) => {
  const { size, color, assigned } = props;
  return (
    <div className="Task-tile">
      <div
        style={{
          width: String(size).concat("%"),
          backgroundColor: color,
          opacity: assigned && 0.4,
        }}
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
