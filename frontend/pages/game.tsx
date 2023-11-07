import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// university
// const cmap = ["#0063A6", "#A71C49", "#DD4814", "#F6A800"];

const cmap = [
  "#0077BB",
  "#EE7733",
  "#009988",
  "#EE3377",
  "#33BBEE",
  "#A71C49",
  "#CC3311",
  "#F6A800",
];

function sumOfArray(ar: Array<number>) {
  var sum = 0;
  for (var i = 0; i < ar.length; i++) {
    if (typeof ar[i] == `number`) sum += ar[i];
  }
  return sum;
}

// const formatter = new Intl.NumberFormat("en-US", {
//   minimumFractionDigits: 0,
//   maximumFractionDigits: 0,
// });

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const Game: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [agents, setAgents] = useState<Array<number>>([]);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [trial, setTrial] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    console.log("process.env.NEXT_PUBLIC_API_URL"),
      process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result: {
            tasks: tasks,
            agents: agents,
            assignments: assignments,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit data");
      }

      const json = await res.json();
      console.log("json response from API", json);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // runs at startup and every time trial changes
  useEffect(() => {
    setLoading(true);
    handleSubmit();
    const fetchGame = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/`)
        .then((response) => response.json())
        .then((json) => {
          setTasks(json["tasks"]);
          setAgents(json["agents"]);
          setDatabaseConnected(true);
          setAssignments([]);
          setLoading(false);
          document.documentElement.style.setProperty(
            `--rows`,
            `${json["tasks"].length}`
          );
          document.documentElement.style.setProperty(
            `--cols`,
            `${json["agents"].length}`
          );
          console.log("fetched game from backend");
        })
        .catch((error) => {
          console.log(error);
          const m = getRandomIntInclusive(6, 8); // only for fallback
          const n = getRandomIntInclusive(5, 8);
          document.documentElement.style.setProperty(`--rows`, `${m}`);
          document.documentElement.style.setProperty(`--cols`, `${n}`);
          const tasksFallback = Array.from(
            { length: m },
            () => 10 * getRandomIntInclusive(1, 9)
          );

          const agentsFallback = Array.from(
            { length: n },
            () => 10 * getRandomIntInclusive(1, 10)
          );
          setTasks(tasksFallback);
          setAgents(agentsFallback);
          setDatabaseConnected(false);
          setAssignments([]);
          setLoading(false);
          console.log("fetched game from fallback");
        });
    };
    fetchGame();
  }, [trial]);

  const handleTileClick = (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number]
  ) => {
    if (loading === false) {
      let newAssignments = [...assignments];
      let index = newAssignments.findIndex(
        (a) => a[0] === coordinates[0] && a[1] === coordinates[1]
      );
      if (index === -1) {
        let indexOther = newAssignments.findIndex(
          (a) => a[0] === coordinates[0]
        );
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
    }
  };

  return agents.length > 0 && tasks.length > 0 ? (
    <div className="App">
      <div className="App-header">
        <h3>
          Assignment{" "}
          <span
            style={databaseConnected ? { color: "green" } : { color: "black" }}
          >
            Optimization
          </span>
        </h3>
        <div className="Game-container">
          <div
            className="Game-container-left"
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
          <div className="Game-container-middle">
            <div
              className="Tile-row-agents"
              style={loading ? { opacity: 0.3 } : {}}
            >
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
              {loading && <div className="loading-spinner"></div>}
              {tasks.map((_, i) => (
                <div
                  key={i}
                  className="Tile-row"
                  style={loading ? { opacity: 0.3 } : {}}
                >
                  {agents.map((_, j) => {
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

          <div className="Game-container-right"></div>
        </div>
        <Button
          size="large"
          variant="contained"
          style={{
            fontSize: "x-large",
            background: "#000000",
            textTransform: "none",
            padding: ".3rem 3rem .3rem 3rem",
          }}
          onClick={() => setTrial(trial + 1)}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <div className="loading-spinner"></div>
    </div>
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
  let filter: string = "";
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="two-digit-number"
          style={{ filter: filter, opacity: opacity }}
        >
          {size}
        </span>
        <div className="Task-tile">
          <div
            style={{
              width: String(size).concat("%"),
              backgroundColor: color,
              filter: filter,
              opacity: opacity,
            }}
            className="Task-tile-inner"
          ></div>
        </div>
      </div>
    </>
  );
};

interface PropsAgentTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const AgentTile: React.FC<PropsAgentTile> = (props) => {
  const { size, activeTasks, tasks } = props;

  const remainingSize =
    size - sumOfArray(activeTasks.map((task) => tasks[task]));
  let opacity: number = 1;
  let filter: string = "";
  if (remainingSize === 0) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ filter: filter, opacity: opacity }}>{remainingSize}</span>
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
    </div>
  );
};

const EmptyTile = () => {
  return (
    <div>
      <span>↱</span>
      <div className="Empty-tile"></div>
    </div>
  );
};

export default Game;
