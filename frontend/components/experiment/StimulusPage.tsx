import React from "react";
import { Button } from "@mui/material";
import GAP from "../GAP/GAP";

const StimulusPage: React.FC<{
  trial: number;
  nTrials: number;
  assignments: Array<[number, number]>;
  setAssignments: (newAssignments: Array<[number, number]>) => void;
  tileEvents: Array<[number, [number, number]]>;
  setTileEvents: (newTileEvents: Array<[number, [number, number]]>) => void;
  tasks: Array<number>;
  workers: Array<number>;
  onComplete: () => void;
}> = ({
  trial,
  nTrials,
  assignments,
  setAssignments,
  tileEvents,
  setTileEvents,
  tasks,
  workers,
  onComplete,
}) => {
  const handleTileClick = (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number],
  ) => {
      let newAssignments = [...assignments];
      let newTileEvents = [...tileEvents];
      let index = newAssignments.findIndex(
        (a) => a[0] === coordinates[0] && a[1] === coordinates[1],
      );
      if (index === -1) {
        let indexOther = newAssignments.findIndex(
          (a) => a[0] === coordinates[0],
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
      newTileEvents.push([Date.now(), coordinates])
      setAssignments(newAssignments);
      setTileEvents(newTileEvents);
  };

  const progress = (100 * (trial - 1)) / nTrials;

    return (
    <>
      <div className="trial-instruction">
        <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
          Assign the books to the boxes.
        </span>
        <div
          id="progress-bar"
          style={{
            display: "flex",
            minWidth: "100%",
            minHeight: ".5rem",
            backgroundColor: "#efefef",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          <div
            id="progress-bar-inner"
            style={{
              minHeight: "100%",
              backgroundColor: "steelblue",
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
      <GAP
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
        onClick={() => onComplete()}
      >
        SUBMIT
       </Button>
            </>
  );
};

export default StimulusPage;
