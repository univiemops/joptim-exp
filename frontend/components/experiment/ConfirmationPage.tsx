import React from "react";
import GAP from "../GAP/GAP";
import { Button } from "@mui/material";

const ConfirmationPage: React.FC<{
  trial: number;
  utility: number;
  optimal_utility: number;
  assignments: Array<[number, number]>;
  assignmentsOptimal: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
  onContinue: () => void;
}> = ({
  trial,
  utility,
  optimal_utility,
  assignments,
  assignmentsOptimal,
  tasks,
  workers,
  onContinue,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
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
            <b>Start!</b>
          </div>
        ) : (
          <>
            <div>
              {optimal_utility > utility ? (
                <div>
                  <b>Trial {trial} completed!</b> Your score is <b>{utility}</b>
                  , the optimal solution is <b>{optimal_utility}</b>.
                </div>
              ) : (
                <div>
                  <b>Trial completed!</b> You found an{" "}
                  <span style={{ color: "darkgreen", fontWeight: "bold" }}>
                    optimal solution
                  </span>{" "}
                  (score: {utility}).
                </div>
              )}
              <br />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: "100%",
              }}
            >
              {" "}
              <GAP
                loading={false}
                tasks={tasks}
                assignments={assignments}
                workers={workers}
                freeze={true}
                icons={false}
              />
              <GAP
                loading={false}
                tasks={tasks}
                assignments={assignmentsOptimal}
                workers={workers}
                freeze={true}
                icons={false}
              />
            </div>
          </>
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

export default ConfirmationPage;
