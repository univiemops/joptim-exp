import React from "react";
import { sumOfArray } from "../utils/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBook } from "@fortawesome/free-solid-svg-icons";

interface PropsXLabelTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

export const XLabelTile: React.FC<PropsXLabelTile> = (props) => {
  const { size, activeTasks, tasks } = props;

  const remainingSize =
    size - sumOfArray(activeTasks.map((task) => tasks[task]));
  let opacity: number = 1;
  let opacityWorker: number = 0.6;
  let filter: string = "";
  let animation: boolean = false;
  if (remainingSize === 0) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }

  if (remainingSize !== size) {
    animation = true;
    opacityWorker = 1;
  }

  return (
    <div className="agent-label-outer">
      <div className="agent-label">
        <FontAwesomeIcon
          icon={faBoxOpen}
          color={"#241f31"}
          size={"1x"}
          opacity={opacityWorker}
        />
        <br />
        <span style={{ filter: filter, opacity: opacity }}>
          {remainingSize}
        </span>
      </div>
    </div>
  );
};

interface PropsYLabelTile {
  size: number;
  color: string;
  assigned: boolean;
}

export const YLabelTile: React.FC<PropsYLabelTile> = (props) => {
  const { size, color, assigned } = props;
  let opacity: number = 1;
  let filter: string = "";
  let animation: boolean = false;
  let opacityTool: number = 0.5;
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
    animation = true;
    opacityTool = 1.0;
  }
  return (
    <>
      <div className="task-label-outer">
        <div className="task-label">
          <span style={{ filter: filter, opacity: opacity }}>{size} </span>
          <FontAwesomeIcon
            icon={faBook}
            color={color}
            size={"1x"}
            opacity={opacity}
          />
        </div>
      </div>
    </>
  );
};
