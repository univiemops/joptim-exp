import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import cmap from "../constants/colors";
import { getRandomIntInclusive } from "../utils/helperFunctions";
import { EmptyTile, EmptyTileX, EmptyTileY } from "../components/EmptyTiles";
import TaskTile from "../components/TaskTile";
import WorkerTile from "../components/WorkerTile";
import { XLabelTile, YLabelTile } from "../components/LabelTiles";

console.log(
  "process.env.NEXT_PUBLIC_API_URL:",
  process.env.NEXT_PUBLIC_API_URL
);

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const Experiment: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [agents, setAgents] = useState<Array<number>>([]);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [trial, setTrial] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${OPTIONAL_SUBURI}/results/`, {
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
      fetch(`${OPTIONAL_SUBURI}/game/`)
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
                {agents.map((size, i) => {
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
                  className="Tile-row-agents"
                  style={loading ? { opacity: 0.3 } : {}}
                >
                  {agents.map((size, i) => {
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
                      {agents.map((_, j) => {
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

              <div className="Game-container-inner-right"></div>
            </div>
          </div>
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

export default Experiment;
