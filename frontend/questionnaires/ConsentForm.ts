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
      text: "...",
    },
    {
      id: "txt3",
      type: "info",
      title: "Procedures",
      text: "...",
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
