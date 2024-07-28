import React from "react";
import { Button } from "@mui/material";

const ConfirmationPage2: React.FC<{
  trial: number;
  nTrials: number;
  onContinue: () => void;
}> = ({ trial, nTrials, onContinue }) => {
  return (
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
        {trial === 0 ? (
          <div id="confirmation-page-2-initial">
            <p>
              Now that you have a good understanding of our problem-solving
              task, let's start with <b>part two</b>!
            </p>
            <p>
              In the following trials, instead of solving problems as before,
              you will see two solutions side by side. These pairs of solutions
              have the same score, which means they are equally good. We want to
              know if you still prefer one of the two solutions.
              <b>Note: </b>Sometimes the solutions are completely identical,
              which means that all assignments are completely identical. If you
              see such pairs, indicate this by clicking on the red "Duplicated
              solutions" button.
            </p>
          </div>
        ) : (
          <div id="confirmation-page-2-ongoing">
            <b>
              Finished trial {trial} of {nTrials}.
            </b>
          </div>
        )}
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
  );
};

export default ConfirmationPage2;
