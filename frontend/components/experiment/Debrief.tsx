import React from "react";
import { Button } from "@mui/material";
import { DebriefQuestionnaire as Questionnaire } from "../../questionnaires/DebriefQuestionnaire";
import { QuestionnaireRenderer } from "../questionnaire/Questionnaire";
import { QuestionnaireProps } from "./types";
import ScrollDownIndicator from "../ScrollDownIndicator";

interface ExtendedQuestionnaireProps extends QuestionnaireProps {
  completionURL: string;
}

const Debrief: React.FC<ExtendedQuestionnaireProps> = ({
  onSubmit,
  finished,
  completionURL,
}) => {
  const [filledOut, setFilledOut] = React.useState<boolean>(false);
  const [highlightMissing, setHighlightMissing] =
    React.useState<boolean>(false);
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
    } else {
      alert("Please answer all questions.");
      setHighlightMissing(true);
    }
  };

  const checkComplete = () => {
    for (const item of Questionnaire.items) {
      if (
        item.type !== "info" &&
        item.type !== "line" &&
        item.type !== "freeTextOpt"
      ) {
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

  const renderFunction = () => {
    if (finished) {
      console.log("Experiment finished, redirecting to", completionURL);
      if (completionURL != null) {
        const timer = setTimeout(() => {
          window.location.href = completionURL;
        }, 3000);
      }
      return (
        <p>
          <b>Experiment completed. You will be redirected ...</b>
        </p>
      );
    } else {
      return (
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
          <ScrollDownIndicator />
        </>
      );
    }
  };

  return <div className="questionnaire">{renderFunction()}</div>;
};

export default Debrief;
