import React from "react";
import { Button, Backdrop } from "@mui/material";

const PauseBackdrop: React.FC<{
  paused: boolean;
  trial: number;
  costs: number;
  optimal_costs: number;
  handleUnpause: () => void;
}> = ({ paused, trial, costs, optimal_costs, handleUnpause }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        flexDirection: "column",
      }}
      open={paused}
    >
      <span
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "x-large",
          margin: "2rem",
        }}
      >
        {trial === 1
          ? "Start!"
          : costs &&
            `The best solution has costs of ${optimal_costs}. You achieved costs of ${costs}.`}
      </span>
      <span
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "x-large",
          margin: "2rem",
        }}
      >
        Trial {trial}
      </span>
      <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
        Click <b>Continue</b> when ready to proceed.
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
        onClick={handleUnpause}
      >
        CONTINUE
      </Button>
    </Backdrop>
  );
};

export default PauseBackdrop;
