import React from "react";
import { Button } from "@mui/material";
import InstructionGAPWrapper from "../GAP/InstructionGAPWrapper";
import { InstructionsProps } from "./types";
import ScrollDownIndicator from "../ScrollDownIndicator";

const Instructions: React.FC<InstructionsProps> = ({ onSubmit }) => {
  return (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>
        Welcome to the <b>Fill the Box Experiment</b>!
      </p>
      <p>
        We will start now with <b>part one</b> of the experiment.
      </p>{" "}
      <p>
        {" "}
        In the center of the screen you will see a table with{" "}
        <b>books (rows)</b> and <b>boxes (columns)</b>. The <b>goal</b> is to
        fill up the boxes as much as possible. Each box has a fixed capacity and
        each book a fixed size, indicated by the numbers. Please try to assign
        each book to one of the boxes. Note: Each box can take more than one
        book if their capacity allows it. Each book can only be assigned to one
        box. The more you fill up the boxes, the higher your score (displayed to
        the right of the arrow icon).{" "}
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
        To assign a book to a box, simply <b>click on the corresponding cell</b>{" "}
        in the table. You can try it out here. Once assigned, the cell will be
        marked with a circle. You can undo your assignment by clicking on the
        same cell or assigning the book to a different box if it has sufficient
        capacity. At the bottom you will see a <b>SUBMIT</b> button. Click it
        when you are satisfied with your assignments.
      </p>
      <p>
        Please note that it will not always be possible to assign all of the
        books, but <b>try to assign the books as best you can.</b>
      </p>
      <p>
        When you are ready, click <b>START</b>. You will then be taken to the
        webcam calibration page. Please make sure you perform the experiment in
        a well-lit environment. As an aid, the webcam stream will appear in the
        upper left corner during the experiment whenever your eye position is no
        longer detected by the eye tracker. When this happens, simply move your
        head back into the square frame (it will change color from red to
        green). Thank you for participating in this experiment!
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
          onClick={onSubmit}
        >
          START
        </Button>
      </div>
      <ScrollDownIndicator />
    </div>
  );
};

export default Instructions;
