import {
  Questionnaire,
} from "../components/questionnaire/questionnaireTypes";

export const DebriefQuestionnaire: Questionnaire = {
  title: "",
  description: "",
  items: [
    {
      id: "txt1",
      type: "info",
      title: "",
      text: "Thank you for taking part in this study. As one of the initial participants to have taken part in this study, we would like to ask you a few additional texts about your experience of the study and any feedback you have about your experience in taking part.",
    },
    {
      id: "txt3",
      type: "info",
      title: "",
      text: "Providing feedback here will have no effect on your receiving payment for taking part in this study. All feedback, both positive and negative, is appreciated.",
    },
    {
      id: "line1",
      type: "line",
      title: "",
      text: "",
    },
    {
      id: "9",
      type: "freeText",
      title: "Your Strategies",
      text: "What strategies or principles did you use to choose between the two solutions?",
    },
    {
      id: "line1",
      type: "line",
      title: "",
      text: "",
    },
    {
      id: "txt4",
      type: "info",
      title: "Study Experience",
      text: "The following texts are about your overall experience of the study.",
    },
    {
      id: "1",
      type: "likert",
      title: "Enjoyment",
      text: "How much did you enjoy taking part in this study?",
      options: { length: 5, leftLabel: "Low", rightLabel: "High" },
    },
    {
      id: "2",
      type: "likert",
      title: "Interest",
      text: "How interesting did you find this study?",
      options: { length: 5, leftLabel: "Boring", rightLabel: "Interesting" },
    },
    {
      id: "3",
      type: "likert",
      title: "Understanding",
      text: "How well were the study instructions explained?",
      options: {
        length: 5,
        leftLabel: "Not very well",
        rightLabel: "Very well",
      },
    },
    {
      id: "4",
      type: "likert",
      title: "Study Purpose",
      text: "How well was the study's purpose and importance conveyed?",
      options: {
        length: 5,
        leftLabel: "Not very well",
        rightLabel: "Very well",
      },
    },
    {
      id: "5",
      type: "likert",
      title: "Length",
      text: "What is your opinion on the length of the study?",
      options: { length: 5, leftLabel: "Too long", rightLabel: "Too short" },
    },
    {
      id: "6",
      type: "noyestext",
      title: "Language",
      text: "Did you notice any typos or grammatical errors?",
      options: ["No", "Yes (Please specify)"],
    },
    {
      id: "line2",
      type: "line",
      title: "",
      text: "",
    },
    {
      id: "txt5",
      type: "info",
      title: "Stimuli Display",
      text: "This next section is about stimulus presentation during the task.",
    },
    {
      id: "line3",
      type: "line",
      title: "",
      text: "",
    },
    {
      id: "7",
      type: "noyestext",
      title: "Tasks",
      text: "Did you notice any errors in the display of the assignment tasks?",
      options: ["No", "Yes (Please specify)"],
    },
    {
      id: "line4",
      type: "line",
      title: "",
      text: "",
    },
    {
      id: "8",
      type: "freeTextOpt",
      title: "Additional Feedback",
      text: "Do you have any other comments about the study? (optional)",
    },
  ],
};
