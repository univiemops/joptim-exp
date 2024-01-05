import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import InstructionGAPWrapper from "@/components/GAP/InstructionGAPWrapper";

export default function Instructions() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="instructions">
          <h1>Instructions</h1>
          <p>
            Welcome to the <b>Optimal Assignment Experiment</b>!
          </p>
          <p>
            The purpose of this psychological experiment is to gain insight into
            how people evaluate complex problems.
          </p>
          <p>
            In the first part, we will introduce you to a special problem called
            the generalized assignment problem and let you solve some examples
            to make sure you understand it. In the second part, we will show you
            pairs of solutions to different problems, and we want you to choose
            the solution that you find easier to understand. But more about that
            later. For now, let us start with an introduction to our Generalized
            Assignment Problem:
          </p>
          <p>
            In the center of the screen you will se a matrix with{" "}
            <b>books (rows)</b> and <b>boxes (columns)</b>. Each box has a fixed
            capacity and each book a fixed size, indicated by the numbers.
            Please try to assign each book to one of the boxes. Note: Each box
            can take more than one book if their capacity allows it. Each book
            can only be assigned once.{" "}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p>
              <i>
                <b>Example Exercise</b>
              </i>
            </p>
            <div className="instructions-game-container-wrapper-outer">
              <div className="instructions-game-container-wrapper">
                <InstructionGAPWrapper />
              </div>
            </div>
          </div>

          <p>
            To assign a book to a box, simply{" "}
            <b>click on the corresponding cell</b> in the matrix. Once assigned,
            the cell will be marked with a circle. You can undo your assignment
            by clicking on the same cell or assigning the book to a different
            box if it has sufficient resources. When you are satisfied with your
            assignments, click the Submit button to complete the trial.
          </p>

          <p>
            Please note that it will not always be possible to assign all of the
            books, but <b>try to assign the books as best you can.</b>
          </p>
          <p>
            If you are ready for the first part, click <b>START</b>. Thank you
            for participating in this experiment!
          </p>
          <div className="instructions-footer">
            <Link href="/experiment">
              <Button
                size="large"
                variant="contained"
                style={{
                  fontSize: "xx-large",
                  background: "#000000",
                  textTransform: "none",
                  padding: ".3rem 3rem .3rem 3rem",
                }}
              >
                START
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
