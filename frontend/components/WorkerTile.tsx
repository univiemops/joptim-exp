import React from "react";
import { sumOfArray } from "@/utils/helperFunctions";
import cmap from "@/constants/colors";

interface PropsWorkerTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const WorkerTile: React.FC<PropsWorkerTile> = (props) => {
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
      <div className="Worker-tile">
        <div
          style={{ height: String(size).concat("%") }}
          className="Worker-tile-inner-capacity"
        ></div>
        <div className="Worker-tile-load-container">
          {activeTasks.map((task, idx) => (
            <div
              key={idx}
              className="Worker-tile-load"
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

export default WorkerTile;
