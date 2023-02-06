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
      (innerArray) =>
        innerArray[0] === coordinates[0] && innerArray[1] === coordinates[1]
    );
    if (index === -1) {
      newAssignments.push(coordinates);
    } else {
      newAssignments.splice(index, 1);
    }
    setAssignments(newAssignments);
  };

  console.log(assignments);

  return (
    <div className="App">
      <div className="App-header">
        <p>Assignment Task (hit F5 to refresh)</p>
        <div className="Game-container">
          <div className="Game-container-left">
            <EmptyTile />
            {task_sizes.map((val, idx) => (
              <TaskTile key={idx} value={val} color={cmap[idx]} />
            ))}
          </div>
          <div className="Game-container-right">
            <div className="Tile-row">
              {agent_sizes.map((val, idx) => (
                <AgentTile key={idx} value={val} />
              ))}
            </div>
            <div className="Tile-container">
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="Tile-row">
                  {Array.from({ length: m }).map((_, j) => {
                    let active = false;
                    let coordinates = [i, j];
                    if (
                      assignments.findIndex(
                        (a) =>
                          a[0] === coordinates[0] && a[1] === coordinates[1]
                      ) !== -1
                    ) {
                      active = true;
                    }

                    return (
                      <AssignTile
                        key={j}
                        active={active}
                        coordinates={coordinates}
                        onClick={() => handleTileClick(coordinates)}
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
  const { coordinates, onClick, active } = props;

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

const TaskTile = ({ value, color }) => {
  return (
    <div className="Task-tile">
      <div
        style={{ width: String(value).concat("%"), backgroundColor: color }}
        className="Task-tile-inner"
      ></div>
    </div>
  );
};

const AgentTile = ({ value }) => {
  return (
    <div className="Agent-tile">
      <div
        style={{ height: String(value).concat("%") }}
        className="Agent-tile-inner"
      ></div>
    </div>
  );
};

const EmptyTile = () => {
  return <div className="Empty-tile"></div>;
};

export default App;
