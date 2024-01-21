import React from "react";
import { Button } from "@mui/material";
import { DebriefQuestionnaire as Questionnaire } from "../../questionnaires/DebriefQuestionnaire";
import { QuestionnaireRenderer } from "../questionnaire/Questionnaire";
import { QuestionnaireProps } from "./QuestionnaireProps";

const Debrief: React.FC<QuestionnaireProps> = ({ onSubmit, finished }) => {
  const [filledOut, setFilledOut] = React.useState<boolean>(false);
  const [responses, setResponses] = React.useState<{
    [itemId: string]: string;
  }>({});

  const handleTextResponse = (itemId: string, value: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [itemId]: value,
    }));
  };

  const handleRadioButtonResponse = (itemId: string, optionId: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [itemId]: optionId,
    }));
  };

  const handleSubmitButtonClick = () => {
    onSubmit(responses);
  };

  const checkComplete = () => {
    for (const item of Questionnaire.items) {
      if (item.type !== "info" && item.type !== "line") {
        const response = responses[item.id];
        if (item.type === "freeText" && (!response || response.trim() === "")) {
          setFilledOut(false);
          return;
        } else if (!response) {
          setFilledOut(false);
          return;
        } else if (item.type == "check" && response === "false") {
          setFilledOut(false);
          return;
        }
      }
    }
    setFilledOut(true);
  };

  React.useEffect(() => {
    checkComplete();
  }, [responses]);
  return (
    <div className="questionnaire">
      <p>
        <b>Experiment completed</b>
      </p>
      {finished !== true && (
        <>
          <QuestionnaireRenderer
            questionnaire={Questionnaire}
            responses={responses}
            handleTextResponse={handleTextResponse}
            handleRadioButtonResponse={handleRadioButtonResponse}
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
            onClick={handleSubmitButtonClick}
          >
            SUBMIT
          </Button>
        </>
      )}
    </div>
  );
};

export default Debrief;
