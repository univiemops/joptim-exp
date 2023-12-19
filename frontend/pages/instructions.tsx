import Link from "next/link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import cmap from "../constants/colors";
import { sumOfArray } from "../utils/helperFunctions";

export default function Instructions() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="instructions">
          <h1>Instructions</h1>

          <p>
            Welcome to the <b>Optimal Assignment Experiment</b>!
          </p>
          <p>
            In the center of the screen you will se a matrix with{" "}
            <b>patient (rows)</b> and <b>doctors (columns)</b>. Each doctor has
            a fixed capacity and each patient a fixed need for care, indicated
            by the numbers. Please try to assign each patient to one of the
            doctors.{" "}
          </p>
          <p>
            Note: Each doctor can take more than one patient if their capacity
            allows it. Each patient can only be assigned once.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p>
              <i>
                <b>Example Exercise</b>
              </i>
            </p>
            <div className="instructions-game-container-wrapper-outer">
              <div className="instructions-game-container-wrapper">
                <GameContainer />
              </div>
            </div>
          </div>

          <p>
            To assign a patient to a doctor, simply{" "}
            <b>click on the corresponding cell</b> in the matrix. Once assigned,
            the cell will be marked with a circle. You can undo your assignment
            by clicking on the same cell or assigning the patient to a different
            doctor if it has sufficient resources. When you are satisfied with
            your assignments, click the Submit button to complete the trial.
          </p>

          <p>
            Please note that it will not always be possible to assign all of the
            patients, but <b>try to assign the patients as best you can.</b>
          </p>
          <p>Thank you for participating in this experiment!</p>
          <div className="instructions-footer">
            <Link href="/game">
              <Button
                size="large"
                variant="contained"
                style={{
                  fontSize: "xx-large",
                  background: "#000000",
                  textTransform: "none",
                  padding: ".3rem 3rem .3rem 3rem",
                }}
              >
                START
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PropsAssignTile {
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AssignTileMini: React.FC<PropsAssignTile> = (props) => {
  const { onClick, active } = props;

  return (
    <div className="Tile-mini" onClick={onClick}>
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

const TaskTileMini: React.FC<PropsTaskTile> = (props) => {
  const { size, color, assigned } = props;
  let opacity: number = 1;
  let filter: string = "";
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="Task-tile-mini">
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
  );
};

interface PropsAgentTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const AgentTileMini: React.FC<PropsAgentTile> = (props) => {
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
      <div className="Agent-tile-mini">
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

const GameContainer = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([70, 55, 45, 40, 20, 10]);
  const [agents, setAgents] = useState<Array<number>>([80, 70, 60, 20]);

  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--box-size-mini`, `20rem`);
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--cols`, `${agents.length}`);
  }
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
      <div className="Game-container-outer-right-mini">
        <div className="Game-container-xlabels-mini">
          <EmptyTileXMini />
          <div className="Game-container-xlabels-inner-mini">
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
            <div className="Tile-row-agents">
              {agents.map((size, i) => {
                const activeTasks = assignments
                  .filter((innerArray) => innerArray[1] === i)
                  .map((innerArray) => innerArray[0]);
                return (
                  <AgentTileMini
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
                  {agents.map((_, j) => {
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

interface PropsYLabelTile {
  size: number;
  color: string;
  assigned: boolean;
}

const YLabelTile: React.FC<PropsYLabelTile> = (props) => {
  const { size, color, assigned } = props;
  let opacity: number = 1;
  let filter: string = "";
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }
  return (
    <>
      <div className="task-label-outer-mini">
        <span
          className="task-label-mini"
          style={{ filter: filter, opacity: opacity }}
        >
          {size}
        </span>
      </div>
    </>
  );
};

interface PropsXLabelTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const XLabelTile: React.FC<PropsXLabelTile> = (props) => {
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
    <div className="agent-label-outer-mini">
      <span
        className="agent-label-mini"
        style={{ filter: filter, opacity: opacity }}
      >
        {remainingSize}
      </span>
    </div>
  );
};

const EmptyTileMini = () => {
  return <div className="Empty-tile-mini"></div>;
};

const EmptyTileYMini = () => {
  return <div className="Empty-tile-y-mini"></div>;
};

const EmptyTileXMini = () => {
  return <div className="Empty-tile-x-mini"></div>;
};
