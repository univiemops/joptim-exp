import React from "react";
import { Button } from "@mui/material";

const ConfirmationPage2: React.FC<{
  trial: number;
  onContinue: () => void;
}> = ({ trial, onContinue }) => {
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
          <div
            id="confirmation-page-2-initial">
            <p>
              Now that you have a good understanding of our problem-solving task, let's start with <b>part two</b>!
            </p>
            <p>
              In the following trials, instead of solving problems as before, you will see two solutions that have the same score. We want you to tell us which of these two solutions you prefer.
            </p>
          </div>
        ) : (
          <div id="confirmation-page-2-ongoing">
            <b>Finished trial {trial}</b>
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
