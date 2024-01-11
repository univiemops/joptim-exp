import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { BasicItem } from "../survey/Items";

const Debrief: React.FC<{
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: () => void;
  finished: boolean;
}> = ({ inputValue, setInputValue, onSubmit, finished }) => {
  const handleButtonClick = () => {
    onSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="debrief">
      <p>
        <b>Experiment completed</b>
      </p>
      {finished !== true && (
        <>
          {/*<div style={{ fontSize: "large" }}>
            <p >
              Thank you for taking part in our study.
            </p>
            <p >
              Your participation is immensely valuable to our research. We
              kindly invite you to share your feedback on the study, including
              your problem-solving strategies, comments, or any additional
              thoughts in the textbox provided below.
            </p>
            <p >
              Your insights will greatly contribute to enhancing the quality of
              our research and improving future studies.
            </p>
            <p >
              Once again, we appreciate your participation and the time you've
              dedicated to our research endeavor. Your input is highly valued.
            </p>
            </div>*/}
          <div style={{ fontSize: "large" }}>
            <p>
              Thank you for taking part in this study. As one of the initial
              participants to have taken part in this study, we would like to
              ask you a few additional questions about your experience of the
              study and any feedback you have about your experience in taking
              part.
            </p>

            <p>
              The following questions are all optional. All feedback, both
              positive and negative, is appreciated.
            </p>

            <p>
              Providing feedback here will have no effect on your receiving
              payment for taking part in this study.
            </p>
            <hr style={{ backgroundColor: "#efefef", color: "#efefef" }} />
            <p>
              <span>
                <b>Study Experience</b>
              </span>
              <br />
              <span>
                The following questions are about your overall experience of the
                study.
              </span>
            </p>
            <BasicItem title={"Enjoyment"}>
              How much did you enjoy taking part in this study?
            </BasicItem>
          </div>
          <hr style={{ backgroundColor: "#efefef", color: "#efefef" }} />
          <TextField
            id="debrief-input-field"
            label="Feedback"
            multiline
            rows={5}
            variant="filled"
            value={inputValue}
            onChange={handleInputChange}
            InputProps={{ style: { fontSize: "x-large" } }}
            style={{ width: "100%" }}
          />
          <Button
            size="large"
            variant="contained"
            style={{
              fontSize: "x-large",
              background: "#000000",
              textTransform: "none",
              padding: ".3rem 3rem .3rem 3rem",
            }}
            onClick={handleButtonClick}
          >
            SUBMIT
          </Button>
        </>
      )}
    </div>
  );
};

export default Debrief;
