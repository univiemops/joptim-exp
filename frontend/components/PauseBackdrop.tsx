import React from "react";
import { Button, Backdrop } from "@mui/material";
import GAP from "./GAP/GAP";

const PauseBackdrop: React.FC<{
  paused: boolean;
  trial: number;
  costs: number;
  optimal_costs: number;
  assignments: Array<[number, number]>;
  assignmentsOptimal: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
  handleUnpause: () => void;
}> = ({
  paused,
  trial,
  costs,
  optimal_costs,
  assignments,
  assignmentsOptimal,
  tasks,
  workers,
  handleUnpause,
}) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff",
        flexDirection: "column",
      }}
      open={paused}
    >
      {paused && (
        <>
          <span
            style={{
              color: "black",
              fontSize: "x-large",
              margin: "2rem",
            }}
          >
            {trial === 1 ? (
              <div>Start!</div>
            ) : (
              <>
                <div>
                  {optimal_costs < costs ? (
                    <div>
                      <b>Trial completed!</b> Your costs are <b>{costs}</b>, the
                      optimal solution has <b>{optimal_costs}</b>.
                    </div>
                  ) : (
                    <div>
                      <b>Trial completed!</b> You found an{" "}
                      <span style={{ color: "darkgreen", fontWeight: "bold" }}>
                        optimal solution
                      </span>{" "}
                      (costs: {costs}).
                    </div>
                  )}
                  <br />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
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
          </span>
          <span style={{ color: "black", fontSize: "x-large", margin: "2rem" }}>
            Click <b>Continue</b> when ready to proceed to <b>Trial {trial}</b>.
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
        </>
      )}
    </Backdrop>
  );
};

export default PauseBackdrop;
