import { Questionnaire } from "../components/questionnaire/questionnaireTypes";

export const ConsentForm: Questionnaire = {
  title: "Informed Consent",
  description: "",
  items: [
    {
      id: "txt1",
      type: "info",
      title: "Introduction",
      text: "Dear participant, I am Dominik Pegler, a researcher conducting a psychological experiment. Before you decide to participate, please read the following information carefully.",
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
      text: "Participation in this online experiment is completely voluntary. You can stop the experiment at any time without any negative consequences. If you registered for the experiment through Prolific, your eligibility for monetary compensation will be clarified in the experiment description on Prolific.",
    },
    {
      id: "txt5",
      type: "info",
      title: "Confidentiality",
      text: "The data collected will be used for research purposes only and will be kept confidential. All data is stored under a pseudonym so that it is not possible to identify the person to whom the data belongs.",
    },
    {
      id: "txt5",
      type: "info",
      title: "Eye-tracking and mouse movements",
      text: "The study will also collect mouse movement and eye-tracking data to better understand how people evaluate complex tasks. For this purpose it is necessary to have a working webcam. Please note that we are not recording the video, but only the coordinates of the points on the screen that were looked at. Please make sure you perform the experiment in a well-lit environment.",
    },
    {
      id: "txt6",
      type: "info",
      title: "Potential Risks and Benefits",
      text: "Participation in the study is not associated with any foreseeable risks or other foreseeable problematic side effects. If you feel uncomfortable during the study, you can stop at any time.",
    },
    {
      id: "txt7",
      type: "info",
      title: "Contact Information",
      text: "If you have any questions or concerns about the study, you can contact me at dominik.pegler@univie.ac.at.",
    },
    {
      id: "check1",
      type: "check",
      title: "Consent",
      text: "I have read and understood the information provided above. I agree to participate in this study willingly.",
    },
  ],
};
