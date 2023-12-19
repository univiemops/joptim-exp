import React from "react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
  );
};

export default TaskTile;
