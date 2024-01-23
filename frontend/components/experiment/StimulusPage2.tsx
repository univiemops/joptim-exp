import React from "react";
import { Button } from "@mui/material";
import GAP from "../GAP/GAP";

const StimulusPage2: React.FC<{
  trial: number;
  nTrials: number;
  assignments1: Array<[number, number]>;
  assignments2: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
  onComplete: () => void;
  setChoice: (value: number) => void;
  choice: number;
}> = ({
  trial,
  nTrials,
  assignments1,
  assignments2,
  tasks,
  workers,
  onComplete,
  setChoice,
  choice,
}) => {
    const handleClick = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
      setChoice(index);
    };
    const progress = (100 * (trial - 1)) / nTrials;

    return (
      <>
        <div className="trial-instruction">
          <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
            Which of the two solutions do you prefer?
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
        <div
          className="stimulus-pair-container"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div
            onClick={(e) => handleClick(e, 1)}
            style={
              choice === 1
                ? {
                  border: "5px solid lightgreen",
                }
                : {
                  border: "5px solid #efefef",
                }
            }
          >
            <GAP
              tasks={tasks}
              assignments={assignments1}
              workers={workers}
              freeze={false}
              icons={false}
            />
          </div>
          <div
            onClick={(e) => handleClick(e, 2)}
            style={
              choice === 2
                ? {
                  border: "5px solid lightgreen",
                }
                : {
                  border: "5px solid #efefef",
                }
            }
          >
            <GAP
              tasks={tasks}
              assignments={assignments2}
              workers={workers}
              freeze={false}
              icons={false}
            />
          </div>
        </div>
        <Button
          disabled={choice === 0 ? true : false}
          size="large"
          variant="contained"
          style={
            choice === 0
              ? {
                fontSize: "x-large",
                textTransform: "none",
                padding: ".3rem 3rem .3rem 3rem",
              }
              : {
                fontSize: "x-large",
                color: "#ffffff",
                background: "#000000",
                textTransform: "none",
                padding: ".3rem 3rem .3rem 3rem",
              }
          }
          onClick={() => onComplete()}
        >
          SUBMIT
        </Button>
      </>
    );
  };

export default StimulusPage2;
