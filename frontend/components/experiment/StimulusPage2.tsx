import React from "react";
import GAP from "../GAP/GAP";
import { Button } from "@mui/material";

const StimulusPage2: React.FC<{
  trial: number;
  nTrials: number;
  assignments1: Array<[number, number]>;
  assignments2: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
  onComplete: (choice: number) => void;
}> = ({
  trial,
  nTrials,
  assignments1,
  assignments2,
  tasks,
  workers,
  onComplete,
}) => {
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
            <div className="stimulus-2-response-buttons" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
              {
                Array.from({ length: 4 }).map((_, i) => (
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
                    {["<< definitely prefer left", "< slightly prefer left", "slightly prefer right >", "definitely prefer right >>"][i]}
                  </Button>
                ))
              }
            </div>
          </div>
          <div
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
              style={
                {
                  border: "5px solid #efefef",
                  marginRight: "3px"
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
              style={
                {
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
            Completely identical
          </Button>
        </div>
      </>
    );
  };

export default StimulusPage2;
