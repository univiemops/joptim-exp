import React from "react";
import { Button } from "@mui/material";
import GAP from "../GAP/GAP";

const ConfirmationPage2Practice: React.FC<{
  choice: number | undefined;
  trialType: string;
  trial: number;
  nTrials: number;
  tasks1: number[];
  tasks2: number[];
  workers1: number[];
  workers2: number[];
  taskOrder1: number[];
  taskOrder2: number[];
  solution1: [number, number][];
  solution2: [number, number][];
  onContinue: () => void;
}> = ({
  choice,
  trialType,
  trial,
  nTrials,
  tasks1,
  tasks2,
  workers1,
  workers2,
  taskOrder1,
  taskOrder2,
  solution1,
  solution2,
  onContinue,
}) => {
  let text = ["", ""];
  let response = "";
  let color = "";
  let leftBorder = "5px solid #efefef";
  let rightBorder = "5px solid #efefef";

  if (choice !== undefined) {
    const textArray = {
      0: ["", ""],
      1: ["definitely", "left"],
      2: ["slightly", "left"],
      3: ["slightly", "right"],
      4: ["definitely", "right"],
    }[choice];

    if (textArray !== undefined) {
      text = textArray;
    }

    if (choice === 0) {
      if (trialType === "catch") {
        response =
          "Well done. You pressed the duplicated button. Both solutions are indeed identical.";
        color = "green";
        leftBorder = "5px solid rgba(0, 128, 0, 0.30)";
        rightBorder = "5px solid rgba(0, 128, 0, 0.30)";
      } else {
        response =
          "You pressed the duplicated button, but the two solutions are not identical!";
        color = "red";
      }
    } else {
      if (trialType === "catch") {
        response =
          "You found the solution on the " +
          text[1] +
          // " " +
          // text[0] +
          " easier to understand, but they are identical!";
        color = "red";
        leftBorder = "5px solid rgba(255, 0, 0, 0.30)";
        rightBorder = "5px solid rgba(255, 0, 0, 0.30)";
      } else {
        response =
          "Well done. You found the solution on the " +
          text[1] +
          " " +
          text[0] +
          " easier to understand.";
        color = "green";
        if (text[1] === "left") {
          leftBorder = "5px solid rgba(0, 128, 0, 0.30)";
        } else {
          rightBorder = "5px solid rgba(0, 128, 0, 0.30)";
        }
      }
    }
  }

  return (
    <>
      {trial === 0 ? (
        <div
          id="confirmation-page-2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "min(100%,900px)",
          }}
        >
          <div
            id="confirmation-page-2-inner"
            style={{
              color: "black",
              fontSize: "x-large",
              margin: "2rem",
              maxWidth: "100%",
            }}
          >
            <div id="confirmation-page-2-initial">
              <p style={{ textAlign: "left" }}>
                Now that you have a good understanding of our problem-solving
                task, let's start with <b>part two</b>!
              </p>
              <p style={{ textAlign: "left" }}>
                In the following trials, instead of solving problems as before,
                you will see two solutions side by side. These pairs of
                solutions have the same score, meaning they both provide equally
                good results. Since you already have experience solving such
                problems, we are interested in which of the two solutions you
                find easier to understand.
              </p>
              {/* <p style={{ color: "red" }}>
              <b>IMPORTANT: </b>Occasionally you will see identical solutions on
              the screen. This means that everything about them is exactly the
              same, including the assignment dots, the arrangement, and the
              colors. When you see these identical pairs, please click on the
              red "Duplicated Solutions" button, but only in such scenarios.
            </p> */}
              <p
                style={{
                  // padding: "15px",
                  // marginBottom: "20px",
                  // border: "1px solid transparent",
                  // borderRadius: "6px",
                  // color: "#a94442",
                  // backgroundColor: "#f2dede",
                  // borderColor: "#ebccd1",
                  textAlign: "left",
                }}
              >
                {/* <center> */}
                <b style={{ color: "red" }}>IMPORTANT:</b> {/* </center> */}
                {/* <br /> */}
                In a few trials, you will see a pair of solutions that are{" "}
                <b>exactly the same</b>: the order of books, boxes, and the
                assignments of books into boxes (i.e., dots in the table) will
                all be completely identical on the left and the right. Only in
                these few trials you should click the{" "}
                <b>"Duplicated solutions"</b> button.
                <br />
                If there is <b>any difference</b> between the two solutions—no
                matter how small—then you should <b>not</b> click the
                "Duplicated solutions" button. Instead, please indicate which
                solution you find easier to understand.
              </p>
              <p style={{ textAlign: "left" }}>
                To ensure you understand the instructions and everything works
                correctly, we will now proceed with five practice trials before
                beginning the main experiment.
              </p>
            </div>
          </div>
          <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
            Click <b>Continue</b> when you are ready to proceed.
          </span>
          <Button
            size="large"
            variant="contained"
            style={{
              fontSize: "x-large",
              background: "#000000",
              textTransform: "none",
              padding: ".3rem 3rem .3rem 3rem",
            }}
            onClick={onContinue}
          >
            CONTINUE
          </Button>
        </div>
      ) : (
        <div>
          <div className="trial-instruction">
            <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
              Finished practice trial {trial} of {nTrials}.
            </span>
            <div
              style={{
                display: "flex",
                minWidth: "100%",
                // backgroundColor: "#efefef",
                // backgroundColor: color,
                borderRadius: "0.2rem",
                overflow: "hidden",
                color: color,
                marginTop: "1rem",
                marginBottom: "1rem",
                justifyContent: "center",
                fontSize: "xx-large",
              }}
            >
              {response}
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
              style={{
                border: leftBorder,
                marginRight: "3px",
              }}
            >
              <GAP
                tasks={tasks1}
                assignments={solution1}
                workers={workers1}
                freeze={true}
                icons={false}
                taskOrder={taskOrder1}
              />
            </div>
            <div
              style={{
                border: rightBorder,
              }}
            >
              <GAP
                tasks={tasks2}
                assignments={solution2}
                workers={workers2}
                freeze={true}
                icons={false}
                taskOrder={taskOrder2}
              />
            </div>
          </div>
          <Button
            size="large"
            variant="contained"
            style={{
              fontSize: "x-large",
              background: "#000000",
              textTransform: "none",
              padding: ".3rem 3rem .3rem 3rem",
              margin: "0.9rem 0.9rem 0.9rem 0.9rem",
            }}
            onClick={onContinue}
          >
            CONTINUE
          </Button>
        </div>
      )}
    </>
  );
};

export default ConfirmationPage2Practice;
