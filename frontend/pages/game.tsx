import React from "react";
import { useState, useEffect } from "react";

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

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const m = 5;
const n = 5;

const tasksFallback = Array.from(
  { length: m },
  () => 10 * getRandomIntInclusive(1, 9)
);

const agentsFallback = Array.from(
  { length: n },
  () => 10 * getRandomIntInclusive(1, 10)
);

const Game: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [agents, setAgents] = useState<Array<number>>([]);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect is starting");
    const fetchGame = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/`)
        .then((response) => response.json())
        .then((json) => {
          setTasks(json["tasks"]);
          setAgents(json["agents"]);
          setDatabaseConnected(true);
          console.log("fetched game from backend");
        })
        .catch((error) => {
          console.log(error);
          setTasks(tasksFallback);
          setAgents(agentsFallback);
          setDatabaseConnected(false);
          console.log("fetched game from fallback");
        });
    };
    fetchGame();
  }, []);

  const handleTileClick = (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number]
  ) => {
    let newAssignments = [...assignments];
    let index = newAssignments.findIndex(
      (a) => a[0] === coordinates[0] && a[1] === coordinates[1]
    );
    if (index === -1) {
      let indexOther = newAssignments.findIndex((a) => a[0] === coordinates[0]);
      const capacity = agents[coordinates[1]];
      const oldLoad = assignments
        .filter((a) => a[1] === coordinates[1])
        .map((a) => tasks[a[0]])
        .reduce((a, b) => a + b, 0);
      const newLoad = tasks[coordinates[0]];
      const limitReached = capacity - oldLoad - newLoad < 0;

      if (limitReached) {
        (e.target as HTMLDivElement).style.backgroundColor = "lightgray";
        setTimeout(() => {
          (e.target as HTMLDivElement).style.backgroundColor = "";
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
    agents.length > 0 &&
    tasks.length > 0 && (
      <div className="App">
        <div className="App-header">
          <h3>
            Assignment Optimization{" "}
            <span
              style={
                databaseConnected ? { color: "green" } : { color: "black" }
              }
            >
              Task
            </span>
          </h3>
          <div className="Game-container">
            <div className="Game-container-left">
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
            <div className="Game-container-right">
              <div className="Tile-row">
                {agents.map((size, i) => {
                  const activeTasks = assignments
                    .filter((innerArray) => innerArray[1] === i)
                    .map((innerArray) => innerArray[0]);
                  return (
                    <AgentTile
                      key={i}
                      size={size}
                      activeTasks={activeTasks}
                      tasks={tasks}
                    />
                  );
                })}
              </div>
              <div className="Tile-container">
                {agents.map((_, i) => (
                  <div key={i} className="Tile-row">
                    {tasks.map((_, j) => {
                      let active = false;
                      if (
                        assignments.findIndex(
                          (a) => a[0] === i && a[1] === j
                        ) !== -1
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
    )
  );
};

interface PropsAssignTile {
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AssignTile: React.FC<PropsAssignTile> = (props) => {
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

interface PropsTaskTile {
  size: number;
  color: string;
  assigned: boolean;
}

const TaskTile: React.FC<PropsTaskTile> = (props) => {
  const { size, color, assigned } = props;
  let opacity: number = 1;
  if (assigned) {
    opacity = 0.4;
  }
  return (
    <div className="Task-tile">
      <div
        style={{
          width: String(size).concat("%"),
          backgroundColor: color,
          opacity: opacity,
        }}
        className="Task-tile-inner"
      ></div>
    </div>
  );
};

interface PropsAgentTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const AgentTile: React.FC<PropsAgentTile> = (props) => {
  const { size, activeTasks, tasks } = props;

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
              minHeight: String(tasks[task]).concat("%"),
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

export default Game;
