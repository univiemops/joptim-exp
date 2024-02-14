import React from "react";
import { sumOfArray } from "../../../utils/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBook } from "@fortawesome/free-solid-svg-icons";
import styles from "./Tiles.module.css";

interface PropsXLabelTile {
  size: number;
  activeTasks: number[];
  tasks: Array<number>;
  icons: boolean;
  mini?: boolean;
}

interface PropsYLabelTile {
  size: number;
  color: string;
  assigned: boolean;
  icons: boolean;
  mini?: boolean;
}

export const XLabelTile: React.FC<PropsXLabelTile> = (props) => {
  const { size, activeTasks, tasks, icons, mini } = props;

  const remainingSize =
    size - sumOfArray(activeTasks.map((task) => tasks[task]));
  let opacityWorker: number = 0.2;

  if (remainingSize !== size) {
    opacityWorker = 1;
  }

  return (
    <div className={mini ? styles.worker_label_outer_mini : styles.worker_label_outer}>
      <div className={mini ? styles.worker_label_mini : styles.worker_label}>
        {icons && (
          <FontAwesomeIcon
            icon={faBoxOpen}
            color={"#241f31"}
            size={"1x"}
            opacity={1}
          />
        )}
        <br />
        <span
          style={
            remainingSize === 0
              ? { filter: "grayscale(50%)", opacity: opacityWorker }
              : { opacity: opacityWorker }
          }
        >
          <b>{size - remainingSize}</b>
        </span>
        <br />
        <span style={{ opacity: 0.55 }}>
          <b>{size}</b>
        </span>
      </div>
    </div>
  );
};

export const YLabelTile: React.FC<PropsYLabelTile> = (props) => {
  const { size, color, assigned, icons, mini } = props;
  let opacity: number = 1;
  if (assigned) {
    opacity = 0.2;
  }
  return (
    <>
      <div className={mini ? styles.task_label_outer_mini : styles.task_label_outer}>
        <div className={mini ? styles.task_label_mini : styles.task_label}>
          <span
            style={
              assigned
                ? { filter: "grayscale(50%)", opacity: opacity }
                : { opacity: opacity }
            }
          >
            {size}{" "}
          </span>
          {icons && (
            <FontAwesomeIcon
              icon={faBook}
              color={color}
              size={"1x"}
              opacity={opacity}
            />
          )}
        </div>
      </div>
    </>
  );
};
