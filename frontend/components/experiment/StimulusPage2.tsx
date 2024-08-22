import React, { ForwardedRef } from "react";
import GAP from "../GAP/GAP";
import { Button } from "@mui/material";

const StimulusPage2 = React.forwardRef<
  HTMLDivElement,
  {
    trial: number;
    nTrials: number;
    tasks1: number[];
    tasks2: number[];
    workers1: number[];
    workers2: number[];
    solution1: [number, number][];
    solution2: [number, number][];
    onComplete: (choice: number) => void;
  }
>(
  (
    {
      trial,
      nTrials,
      tasks1,
      tasks2,
      workers1,
      workers2,
      solution1,
      solution2,
      onComplete,
    },
    eyeTrackingRef: ForwardedRef<HTMLDivElement>
  ) => {
    const progress = (100 * (trial - 1)) / nTrials;

    return (
      <>
        <div>
          <div className="trial-instruction">
            <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
              Which of the two solutions do you find easier to understand?
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
            <div
              className="stimulus-2-response-buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Button
                  key={i}
                  size="large"
                  variant="contained"
                  style={{
                    color: "#000",
                    background: "#f2f2f2",
                    textTransform: "none",
                    padding: ".3rem 3rem .3rem 3rem",
                    margin: "1rem 1rem 0rem 1rem",
                  }}
                  onClick={() => {
                    onComplete(i + 1);
                  }}
                >
                  {
                    [
                      "<< left",
                      "< slightly left",
                      "slightly right >",
                      "right >>",
                    ][i]
                  }
                </Button>
              ))}
            </div>
          </div>
          <div
            ref={eyeTrackingRef}
            className="stimulus-pair-container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              cursor: "default",
            }}
          >
            <div
              style={{
                border: "5px solid #efefef",
                marginRight: "3px",
              }}
            >
              <GAP
                tasks={tasks1}
                assignments={solution1}
                workers={workers1}
                freeze={false}
                icons={false}
              />
            </div>
            <div
              style={{
                border: "5px solid #efefef",
              }}
            >
              <GAP
                tasks={tasks2}
                assignments={solution2}
                workers={workers2}
                freeze={false}
                icons={false}
              />
            </div>
          </div>
          <Button
            size="large"
            variant="contained"
            style={{
              color: "#000",
              background: "#ff000082",
              textTransform: "none",
              padding: ".3rem 3rem .3rem 3rem",
              margin: "1rem 1rem 1rem 1rem",
            }}
            onClick={() => {
              onComplete(0);
            }}
          >
            Duplicated solutions
          </Button>
        </div>
      </>
    );
  }
);

// Necessary as this functions with e.g. React.forwardRef
// create components that do not automatically inherit a display
// name from the function that defines them
StimulusPage2.displayName = "StimulusPage2";
export default StimulusPage2;
