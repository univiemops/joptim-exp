import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { BasicItem, RadioItem } from "../survey/Items";

interface DebriefProps {
  onSubmit: (selections: Record<number, number>, notes: string) => void;
  finished: boolean;
}
type SurveyItem = {
  item: number;
  title: string;
  leftEnd?: string;
  rightEnd?: string;
  question: string;
  answers?: string[];
};

const Survey: SurveyItem[] = [
  {
    item: 0,
    title: "Enjoyment",
    leftEnd: "Low",
    rightEnd: "High",
    question: "How much did you enjoy taking part in this study?",
  },
  {
    item: 1,
    title: "Interest",
    leftEnd: "Boring",
    rightEnd: "Interesting",
    question: "How interesting did you find this study?",
  },
  {
    item: 2,
    title: "Understanding",
    leftEnd: "Not very well",
    rightEnd: "Very well",
    question: "How well were the study instructions explained?",
  },
  {
    item: 3,
    title: "Study Purpose",
    leftEnd: "Not very well",
    rightEnd: "Very well",
    question: "How well was the study's purpose and importance conveyed?",
  },
  {
    item: 4,
    title: "Length",
    leftEnd: "Too long",
    rightEnd: "Too short",
    question: "What is your opinion on the length of the study?",
  },
  {
    item: 5,
    title: "Language",
    answers: ["No", "Yes (Please specify)"],
    question: "Did you notice any typos or grammatical errors?",
  },
];

const Debrief: React.FC<DebriefProps> = ({ onSubmit, finished }) => {
  const [selections, setSelections] = React.useState<
    Record<number, number> | {}
  >({});
  const [inputValue, setInputValue] = React.useState<string>("");
  const [filledOut, setFilledOut] = React.useState<boolean>(false);

  type CombinedEvent = React.ChangeEvent<{}> | React.MouseEvent<HTMLElement>;
  type MuiOnChange = (event: CombinedEvent, value: any) => void;

  const handleChoice = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>,
    value: number | null,
    item?: number,
  ) => {
    if (value !== null && item !== undefined) {
      let newSelections = { ...selections };
      newSelections[item] = value;
      setSelections(newSelections);
    }
  };

  const handleButtonClick = () => {
    onSubmit(selections, inputValue);
  };

  const checkComplete = () => {
    if (
      inputValue.length > 0 &&
      Survey.length === Object.keys(selections).length
    ) {
      setFilledOut(true);
    } else {
      setFilledOut(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  React.useEffect(() => {
    checkComplete();
  }, [inputValue, selections]);

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
            {Survey.map((item) =>
              "answers" in item
                ? item.answers && (
                    <RadioItem
                      key={item.item}
                      item={item.item}
                      title={item.title}
                      answers={item.answers}
                      choice={
                        item.item in selections
                          ? (selections as Record<number, number>)[item.item]
                          : null
                      }
                      onChange={handleChoice}
                    >
                      {item.question}
                    </RadioItem>
                  )
                : item.leftEnd &&
                  item.rightEnd && (
                    <BasicItem
                      key={item.item}
                      item={item.item}
                      title={item.title}
                      leftEnd={item.leftEnd}
                      rightEnd={item.rightEnd}
                      choice={
                        item.item in selections
                          ? (selections as Record<number, number>)[item.item]
                          : null
                      }
                      onChange={handleChoice}
                    >
                      {item.question}
                    </BasicItem>
                  ),
            )}
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
            disabled={filledOut ? false : true}
            size="large"
            variant="contained"
            style={
              filledOut
                ? {
                    fontSize: "x-large",
                    color: "#ffffff",
                    background: "#000000",
                    textTransform: "none",
                    padding: ".3rem 3rem .3rem 3rem",
                    margin: "1rem 1rem 1rem 1rem",
                  }
                : {
                    fontSize: "x-large",
                    textTransform: "none",
                    padding: ".3rem 3rem .3rem 3rem",
                    margin: "1rem 1rem 1rem 1rem",
                  }
            }
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
