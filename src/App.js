import "./App.css";
import React from "react";

const m = 4;
const n = 4;

const cmap = ["#0063A6", "#A71C49", "#DD4814", "#F6A800"];

const task_sizes = Array.from(
  { length: n },
  () => 10 * Math.floor(Math.random() * 10)
);

const agent_sizes = Array.from(
  { length: n },
  () => 10 * Math.floor(Math.random() * 10)
);

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <p>Assignment Task (hit F5 to refresh)</p>
        <div className="Game-container">
          <div className="Game-container-left">
            <EmptyTile />
            {task_sizes.map((val, idx) => (
              <TaskTile value={val} color={cmap[idx]} />
            ))}
          </div>
          <div className="Game-container-right">
            <div className="Tile-row">
              {agent_sizes.map((val) => (
                <AgentTile value={val} />
              ))}
            </div>
            <div className="Tile-container">
              {Array(n).fill(
                <div className="Tile-row">{Array(m).fill(<Tile />)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tile = () => {
  const [assigned, setAssigned] = React.useState(false);
  return (
    <div className="Tile" onClick={() => setAssigned(assigned == false)}>
      {assigned && (
        <svg className="SVG-circle">
          <circle
            cx="40"
            cy="40"
            r="20"
            stroke="black"
            stroke-width="3"
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
