import React from "react";
import { Button } from "@mui/material";
import InstructionGAPWrapper from "../GAP/InstructionGAPWrapper";
import { InstructionsProps } from "./types"


const Instructions: React.FC<InstructionsProps> = ({ onSubmit }) => {
  return (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>
        Welcome to the <b>Fill the Box Experiment</b>!
      </p>
      <p>
        The purpose of this psychological experiment is to gain insight into
        how people evaluate complex problems.
      </p>
      <p>
        In <b>part one</b>, we will introduce you to a problem-solving task and let you solve some examples to
        make sure you understand it. In <b>part two</b>, we will show you
        pairs of solutions to various example problems, and we want you to choose
        the solution that you prefer. But more about that
        later. For now, let's start with an introduction to the problem-solving task:
      </p>{" "}
      <p>
        {" "}
        In the center of the screen you will see a matrix with{" "}
        <b>books (rows)</b> and <b>boxes (columns)</b>. The <b>goal</b> is to
        fill up the boxes as much as possible. Each box has a fixed capacity
        and each book a fixed size, indicated by the numbers. Please try to
        assign each book to one of the boxes. Note: Each box can take more
        than one book if their capacity allows it. Each book can only be
        assigned once. The more you fill up the boxes, the higher your score (displayed to the right of the arrow icon).{" "}
      </p>{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {" "}
        <p>
          {" "}
          <i>
            <b>Example Exercise</b>{" "}
          </i>{" "}
        </p>{" "}
        <div className="instructions-game-container-wrapper-outer">
          <div className="instructions-game-container-wrapper">
            <InstructionGAPWrapper />{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <p>
        To assign a book to a box, simply{" "}
        <b>click on the corresponding cell</b> in the matrix. You can try it
        out here. Once assigned, the cell will be marked with a circle. You
        can undo your assignment by clicking on the same cell or assigning the
        book to a different box if it has sufficient resources. When you are
        satisfied with your assignments, click the <b>SUBMIT</b> button.
      </p>
      <p>
        Please note that it will not always be possible to assign all of the
        books, but <b>try to assign the books as best you can.</b>
      </p>
      <p>
        If you are ready for the first part, click <b>START</b>. Thank you for
        participating in this experiment!
      </p>
      <div className="instructions-footer">
        <Button
          size="large"
          variant="contained"
          style={{
            fontSize: "x-large",
            background: "#000000",
            textTransform: "none",
            padding: ".3rem 3rem .3rem 3rem",
          }}
          onClick={onSubmit}>
          START
        </Button>
      </div>
    </div>
  );
}

export default Instructions;
