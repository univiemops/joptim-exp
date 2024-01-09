import React from "react";
import GAP from "../GAP/GAP";
import { Button } from "@mui/material";

const ConfirmationPage2: React.FC<{
  trial: number;
  onContinue: () => void;
}> = ({ trial, onContinue }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "min(100%,900px)",
      }}
    >
      <div
        style={{
          color: "black",
          fontSize: "x-large",
          margin: "2rem",
          maxWidth: "100%",
        }}
      >
        {trial === 0 ? (
          <div>
            <p>
              Now that you have a good understanding of what the Generalized
              Assignment Problem is, let's start with <b>part two</b>!
            </p>
            <p>
              In the following trials you will not solve problems like before,
              but you will always be shown two solutions. We want to know from
              you which of these two solutions you prefer.
            </p>
          </div>
        ) : (
          <div>
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
