import Link from "next/link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const cmap = [
  "#CC6677",
  "#332288",
  "#DDCC77",
  "#117733",
  "#88CCEE",
  "#882255",
  "#44AA99",
  "#999933",
  "#AA4499",
  "#DDDDDD",
];

function sumOfArray(ar: Array<number>) {
  var sum = 0;
  for (var i = 0; i < ar.length; i++) {
    if (typeof ar[i] == `number`) sum += ar[i];
  }
  return sum;
}

export default function Instructions() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="instructions">
          <h1>Instructions</h1>

          <p>
            Welcome to the <b>Assignment Optimization Experiment</b>!
          </p>
          <p>
            In this experiment, you will see a matrix in the center of the
            screen with <b>tasks</b> (rows) and <b>agents</b> (columns). We want
            you to assign each task to one of the agents. Note that agents can
            take more than one task if they have the available resources (see
            the height of their dashed bars). The tasks also have a certain
            size, represented by the length of their bars, but can only be
            assigned to 1 agent.
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
                <b>Example Matrix</b>
              </i>
            </p>
            <div className="instructions-game-container-wrapper-outer">
              <div className="instructions-text-agents">AGENTS</div>
              <div className="instructions-game-container-wrapper">
                <div className="instructions-text-tasks">TASKS</div>
                <GameContainer />
              </div>
            </div>
          </div>

          <p>
            To assign a task to an agent, simply{" "}
            <b>click on the corresponding cell</b> in the matrix. Once assigned,
            the cell will be marked with a circle. You can undo your assignment
            by clicking on the same cell or assigning the task to a different
            agent if it has sufficient resources. When you are satisfied with
            your assignments, click the Submit button to complete the trial.
          </p>

          <p>
            Please note that it will not always be possible to assign all of the
            tasks, but <b>try to assign the tasks as best you can.</b>
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
      <span style={{ filter: filter, opacity: opacity }}>{size}</span>
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
      <span style={{ filter: filter, opacity: opacity }}>{remainingSize}</span>
      {/* <span style={{ fontSize: 16 }}>/{size}</span> */}
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

const EmptyTileMini = () => {
  return (
    <div>
      <span>↱</span>
      <div className="Empty-tile-mini"></div>
    </div>
  );
};
const GameContainer = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([20, 30, 70, 10, 40]);
  const [agents, setAgents] = useState<Array<number>>([40, 80, 20, 50]);

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
    <div className="Game-container-mini">
      <div className="Game-container-left">
        <EmptyTileMini />
        {tasks.map((size, idx) => {
          const assigned =
            assignments.filter((innerArray) => innerArray[0] === idx).length ===
            1;
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
      <div className="Game-container-middle">
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
                  assignments.findIndex((a) => a[0] === i && a[1] === j) !== -1
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
  );
};
