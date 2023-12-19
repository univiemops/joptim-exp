import React from "react";
import { sumOfArray } from "../../../utils/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBook } from "@fortawesome/free-solid-svg-icons";
import styles from "./Tiles.module.css";

interface PropsXLabelTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
}

interface PropsYLabelTile {
  size: number;
  color: string;
  assigned: boolean;
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
    <div className={styles.worker_label_outer}>
      <div className={styles.worker_label}>
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
      <div className={styles.task_label_outer}>
        <div className={styles.task_label}>
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

export const YLabelTileMini: React.FC<PropsYLabelTile> = (props) => {
  const { size, color, assigned } = props;
  let opacity: number = 1;
  let filter: string = "";
  if (assigned) {
    opacity = 0.2;
    filter = "grayscale(50%)";
  }
  return (
    <>
      <div className={styles.task_label_outer_mini}>
        <span
          className={styles.task_label_mini}
          style={{ filter: filter, opacity: opacity }}
        >
          {size}
        </span>
      </div>
    </>
  );
};

export const XLabelTileMini: React.FC<PropsXLabelTile> = (props) => {
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
    <div className={styles.worker_label_outer_mini}>
      <span
        className={styles.worker_label_mini}
        style={{ filter: filter, opacity: opacity }}
      >
        {remainingSize}
      </span>
    </div>
  );
};
