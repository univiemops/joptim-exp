import React from "react";
import { sumOfArray } from "@/utils/helperFunctions";
import cmap from "@/constants/colors";

interface PropsAgentTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

const WorkerTile: React.FC<PropsAgentTile> = (props) => {
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

export default WorkerTile;
