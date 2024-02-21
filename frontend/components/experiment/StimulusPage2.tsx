import React from "react";
import GAP from "../GAP/GAP";

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
    const [choice, setChoice] = React.useState<number>(0);
    return (
      <>
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
            onClick={() => {
              setChoice(1);
              onComplete(1);
            }}
            style={
              choice === 1
                ? {
                  border: "5px solid lightgreen",
                  cursor: "pointer",
                }
                : {
                  border: "5px solid #efefef",
                  cursor: "pointer",
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
            onClick={() => {
              setChoice(2);
              onComplete(2);
            }}
            style={
              choice === 2
                ? {
                  border: "5px solid lightgreen",
                  cursor: "pointer",
                }
                : {
                  border: "5px solid #efefef",
                  cursor: "pointer",
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
      </>
    );
  };

export default StimulusPage2;
