import React from "react";
import { Button } from "@mui/material";
import { ProblemSolvingInventory as Questionnaire } from "../../questionnaires/ProblemSolvingInventory";
import { QuestionnaireRenderer } from "../questionnaire/Questionnaire";
import { QuestionnaireProps } from "./types";
import ScrollDownIndicator from "../ScrollDownIndicator"

const PSI: React.FC<QuestionnaireProps> = ({ onSubmit, finished }) => {
  const [filledOut, setFilledOut] = React.useState<boolean>(false);
  const [highlightMissing, setHighlightMissing] = React.useState<boolean>(false);
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
    if (filledOut) {
      onSubmit(responses);
    } else { alert("Please answer all questions."); setHighlightMissing(true) }
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
      {finished !== true && (
        <>
          <QuestionnaireRenderer
            questionnaire={Questionnaire}
            responses={responses}
            highlightMissing={highlightMissing}
            handleTextResponse={handleTextResponse}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
          <Button
            size="large"
            variant="contained"
            style={{
              fontSize: "x-large",
              color: "#ffffff",
              background: "#000000",
              textTransform: "none",
              padding: ".3rem 3rem .3rem 3rem",
              margin: "1rem 1rem 1rem 1rem",
            }}
            onClick={handleSubmitButtonClick}
          >
            SUBMIT
          </Button>
        </>
      )}

      <ScrollDownIndicator />
    </div>
  );
};

export default PSI;
