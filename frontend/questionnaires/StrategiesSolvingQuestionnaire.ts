import {
  Questionnaire,
} from "../components/questionnaire/questionnaireTypes";

export const StrategiesSolvingQuestionnaire: Questionnaire = {
  title: "",
  description: "",
  items: [
    {
      id: "1",
      type: "freeText",
      title: "Your Strategies",
      text: "What strategies or principles did you use to fill the boxes?",
    },
  ],
};
