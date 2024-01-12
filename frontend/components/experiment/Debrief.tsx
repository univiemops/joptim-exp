import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { BasicItem, RadioItem } from "../survey/Items";

interface DebriefProps {
  onSubmit: (
    selections: Record<number, number>,
    radioValue: number,
    notes: string,
  ) => void;
  finished: boolean;
}

const Debrief: React.FC<DebriefProps> = ({ onSubmit, finished }) => {
  const [radioValue, setRadioValue] = React.useState<number>();
  const [selections, setSelections] = React.useState<
    Record<number, number> | {}
  >({});
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleChoice = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: number,
  ) => {
    let newSelections = { ...selections };
    newSelections[item] = parseInt(event.target.value, 10);
    setSelections(newSelections);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(parseInt(event.target.value, 10));
  };

  const handleButtonClick = () => {
    onSubmit(selections, radioValue, inputValue);
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
            <BasicItem
              item={0}
              title={"Enjoyment"}
              leftEnd={"Low"}
              rightEnd={"High"}
              choice={selections[0]}
              onChange={handleChoice}
            >
              How much did you enjoy taking part in this study?
            </BasicItem>

            <BasicItem
              item={1}
              title={"Interest"}
              leftEnd={"Boring"}
              rightEnd={"Interesting"}
              choice={selections[1]}
              onChange={handleChoice}
            >
              How interesting did you find this study?
            </BasicItem>

            <BasicItem
              item={2}
              title={"Understanding"}
              leftEnd={"Not very well"}
              rightEnd={"Very well"}
              choice={selections[2]}
              onChange={handleChoice}
            >
              How well were the study instructions explained?
            </BasicItem>
            <BasicItem
              item={3}
              title={"Study Purpose"}
              leftEnd={"Not very well"}
              rightEnd={"Very well"}
              choice={selections[3]}
              onChange={handleChoice}
            >
              How well was the study's purpose and importance conveyed?
            </BasicItem>
            <BasicItem
              item={4}
              title={"Length"}
              leftEnd={"Too long"}
              rightEnd={"Too short"}
              choice={selections[4]}
              onChange={handleChoice}
            >
              What is your opinion on the length of the study?
            </BasicItem>

            <RadioItem
              title={"Language"}
              answers={["No", "Yes (Please specify)"]}
              value={radioValue}
              onChange={handleChangeRadio}
            >
              Did you notice any typos or grammatical errors?
            </RadioItem>
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
              margin: "1rem 1rem 1rem 1rem",
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
