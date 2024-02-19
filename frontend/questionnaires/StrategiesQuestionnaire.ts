import {
  Questionnaire,
} from "../components/questionnaire/questionnaireTypes";

export const StrategiesQuestionnaire: Questionnaire = {
  title: "",
  description: "",
  items: [
    {
      id: "1",
      type: "freeText",
      title: "Your Strategies",
      text: "What strategies or principles did you use to choose between the two solutions?",
    },
  ],
};
