import React from "react";
import { Button } from "@mui/material";
import GAP from "../GAP/GAP";

const StimulusPage: React.FC<{
  trial: number;
  loading: boolean;
  assignments: Array<[number, number]>;
  setAssignments: (newAssignments: Array<[number, number]>) => void;
  tasks: Array<number>;
  workers: Array<number>;
  onComplete: () => void;
}> = ({
  trial,
  loading,
  assignments,
  setAssignments,
  tasks,
  workers,
  onComplete,
}) => {
  const handleTileClick = (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number],
  ) => {
    if (loading === false) {
      let newAssignments = [...assignments];
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
      setAssignments(newAssignments);
    }
  };
  return (
    <>
      <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
        Trial {trial}: Assign the books to boxes
      </span>
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
        onClick={() => onComplete()}
      >
        SUBMIT
      </Button>
    </>
  );
};

export default StimulusPage;
