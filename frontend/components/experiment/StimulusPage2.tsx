import React from "react";
import { Button } from "@mui/material";
import GAP from "../GAP/GAP";

const StimulusPage2: React.FC<{
  trial: number;
  loading: boolean;
  assignments1: Array<[number, number]>;
  assignments2: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
  onComplete: () => void;
}> = ({
  trial,
  loading,
  assignments1,
  assignments2,
  tasks,
  workers,
  onComplete,
}) => {
  const [selected, setSelected] = React.useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (loading === false) {
      setSelected(index);
    }
  };

  return (
    <>
      <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
        Trial {trial}: Which of the two solutions do you find easier to
        understand?
      </span>
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
        <div
          onClick={(e) => handleClick(e, 1)}
          style={
            selected === 1
              ? { border: "5px solid lightgreen", cursor: "pointer" }
              : { border: "5px solid #efefef", cursor: "pointer" }
          }
        >
          <GAP
            loading={false}
            tasks={tasks}
            assignments={assignments1}
            workers={workers}
            freeze={false}
            icons={false}
          />
        </div>
        <div
          onClick={(e) => handleClick(e, 2)}
          style={
            selected === 2
              ? { border: "5px solid lightgreen", cursor: "pointer" }
              : { border: "5px solid #efefef", cursor: "pointer" }
          }
        >
          <GAP
            loading={false}
            tasks={tasks}
            assignments={assignments2}
            workers={workers}
            freeze={false}
            icons={false}
          />
        </div>
      </div>
      <Button
        disabled={selected === 0 ? true : false}
        size="large"
        variant="contained"
        style={
          selected === 0
            ? {
                fontSize: "x-large",
                textTransform: "none",
                padding: ".3rem 3rem .3rem 3rem",
              }
            : {
                fontSize: "x-large",
                color: "#ffffff",
                background: "#000000",
                textTransform: "none",
                padding: ".3rem 3rem .3rem 3rem",
              }
        }
        onClick={() => onComplete()}
      >
        SUBMIT
      </Button>
    </>
  );
};

export default StimulusPage2;
