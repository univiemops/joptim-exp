import { Questionnaire } from "../components/questionnaire/questionnaireTypes";

export const ConsentForm: Questionnaire = {
  title: "Informed Consent Form for Online Psychological Experiment",
  description: "",
  items: [
    {
      id: "txt1",
      type: "info",
      title: "Introduction",
      text: "Dear participant, I am [NAME], a researcher conducting a psychological experiment. Before you decide to participate, please read the following information carefully.",
    },
    {
      id: "txt2",
      type: "info",
      title: "Purpose of the Study",
      text: "The purpose of this psychological experiment is to gain insight into how people evaluate complex problems.",
    },
    {
      id: "txt3",
      type: "info",
      title: "Procedures",
      text: "In part one, we will introduce you to a problem-solving task and let you solve some examples to make sure you understand it.In part two, we will show you pairs of solutions to various example problems, and we want you to choose the solution that you prefer.",
    },
    {
      id: "txt4",
      type: "info",
      title: "Voluntary Participation",
      text: "...",
    },
    {
      id: "txt5",
      type: "info",
      title: "Confidentiality",
      text: "...",
    },
    {
      id: "txt6",
      type: "info",
      title: "Potential Risks and Benefits",
      text: "...",
    },
    {
      id: "txt7",
      type: "info",
      title: "Contact Information",
      text: "If you have any questions or concerns about the study, you can contact me at [Your Email Address].",
    },
    {
      id: "check1",
      type: "check",
      title: "Consent",
      text: "I have read and understood the information provided above. I agree to participate in this study willingly.",
    },
  ],
};
