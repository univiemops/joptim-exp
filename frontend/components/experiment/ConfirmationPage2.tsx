import React from "react";
import { Button } from "@mui/material";

const ConfirmationPage2: React.FC<{
  trial: number;
  nTrials: number;
  practiced: boolean;
  onContinue: () => void;
  onRepeatPractice: () => void;
}> = ({ trial, nTrials, onContinue, onRepeatPractice }) => {
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
            <p style={{ textAlign: "left" }}>
              You have completed the practice trials. Would you like to proceed
              to the real trials or repeat the practice trials?
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
      {/* <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
        Ready to proceed? Click <b>CONTINUE</b>.
      </span> */}
      <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
        Ready to proceed? Click below.
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
      {/* <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
        Need more practice? Click <b>REPEAT PRACTICE</b>.
      </span> */}
      <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
        Need more practice? Click below.
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
        onClick={onRepeatPractice}
      >
        REPEAT PRACTICE
      </Button>
    </div>
  );
};

export default ConfirmationPage2;
