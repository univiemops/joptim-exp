import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { getRandomIntInclusive, getCosts } from "../utils/helperFunctions";
import GAP from "../components/GAP/GAP";
import PauseBackdrop from "../components/PauseBackdrop";

console.log(
  "process.env.NEXT_PUBLIC_API_URL:",
  process.env.NEXT_PUBLIC_API_URL
);

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

const Experiment: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [assignmentsOptimal, setAssignmentsOptimal] = useState<
    Array<[number, number]>
  >([]);
  const [costs, setCosts] = useState<number>(0);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [trial, setTrial] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [paused, setPaused] = React.useState<boolean>(true);

  // runs after the experiment is "unpaused" before the next trial
  useEffect(() => {
    if (paused === false) {
      const fetchGame = () => {
        setLoading(true);
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setCosts(json["costs"]);
            setAssignmentsOptimal(json["assignments_optimal"]);
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
            console.log("entire data from back is:", json);
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

            const workersFallback = Array.from(
              { length: n },
              () => 10 * getRandomIntInclusive(1, 10)
            );
            setTasks(tasksFallback);
            setWorkers(workersFallback);
            setDatabaseConnected(false);
            setAssignments([]);
            setLoading(false);
            console.log("fetched game from fallback");
          });
      };
      fetchGame();
    }
  }, [paused]);

  const handleUnpause = () => {
    setPaused(false);
    startTime = performance.now();
  };

  const handlePause = () => {
    setPaused(true);
  };

  const handleSubmit = async (reactionTime: number) => {
    console.log(`Reaction time: ${reactionTime} milliseconds`);
    console.log(
      "costs are",
      getCosts(tasks, assignments),
      "while optimal costs are",
      costs
    );
    try {
      const res = await fetch(`${OPTIONAL_SUBURI}/results/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result: {
            tasks: tasks,
            workers: workers,
            assignments: assignments,
            rt: reactionTime,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit data");
      }

      const json = await res.json();
      console.log("json response from API", json);
    } catch (error) {
      console.error(error);
    }
  };

  // runs at startup and every time trial changes
  useEffect(() => {
    console.log("trial no.", trial);

    if (trial > 1) {
      if (startTime !== null) {
        const endTime: number = performance.now();
        const reactionTime: number = endTime - startTime;
        startTime = null;
        handleSubmit(reactionTime);
        handlePause();
      }
    }
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
        const capacity = workers[coordinates[1]];
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
  return (
    <div className="App">
      <PauseBackdrop
        paused={paused}
        trial={trial}
        costs={getCosts(tasks, assignments)}
        optimal_costs={costs}
        assignments={assignments}
        assignmentsOptimal={assignmentsOptimal}
        tasks={tasks}
        workers={workers}
        handleUnpause={handleUnpause}
      />
      {paused === false ? (
        <div className="App-header">
          <h3>
            Assign the books to{" "}
            <span
              style={
                databaseConnected ? { color: "green" } : { color: "black" }
              }
            >
              boxes
            </span>
          </h3>
          <GAP
            loading={loading}
            tasks={tasks}
            assignments={assignments}
            workers={workers}
            handleTileClick={handleTileClick}
            freeze={false}
            icons={true}
          />{" "}
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Experiment;
