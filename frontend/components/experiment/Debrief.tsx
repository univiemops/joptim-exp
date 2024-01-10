import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

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
          <div>
            <p style={{ fontSize: "large" }}>
              Thank you for taking part in our study.
            </p>
            <p style={{ fontSize: "large" }}>
              Your participation is immensely valuable to our research. We
              kindly invite you to share your feedback on the study, including
              your problem-solving strategies, comments, or any additional
              thoughts in the textbox provided below.
            </p>
            <p style={{ fontSize: "large" }}>
              Your insights will greatly contribute to enhancing the quality of
              our research and improving future studies.
            </p>
            <p style={{ fontSize: "large" }}>
              Once again, we appreciate your participation and the time you've
              dedicated to our research endeavor. Your input is highly valued.
            </p>
          </div>
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
