import { useState } from "react";
import GAP from "./GAP";

const InstructionGAPWrapper = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([70, 55, 45, 40, 20, 10]);
  const [workers, setWorkers] = useState<Array<number>>([80, 70, 60, 20]);

  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--box-size-mini`, `20rem`);
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--cols`, `${workers.length}`);
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
  };

  return (
    <GAP
      tasks={tasks}
      assignments={assignments}
      workers={workers}
      freeze={false}
      icons={true}
      handleTileClick={handleTileClick}
    />
  );
};

export default InstructionGAPWrapper;
