import { Questionnaire } from "../components/questionnaire/questionnaireTypes";

export const ConsentForm: Questionnaire = {
  title: "Information for participants and declaration of consent to participate in the study",
  description: "",
  items: [
    {
      id: "txt0",
      type: "info",
      title: "",
      text: "<b><u><i>Understanding problem solving and evaluation in assignment tasks</i></u></b><br><br>Dear participant,<br><br> We would like to invite you to participate in the study mentioned above.<br><br><b>Your participation in this study is voluntary. You can refuse to participate at any time, without having to give a reason, or also withdraw your agreement to participate once the study has already started. There will be no negative consequences for you if you refuse to participate or if you withdraw from this study early.</b><br><br> This kind of study is necessary to gain new, reliable academic research results. However, your written consent to participate in the study is an indispensable prerequisite for us to conduct this study. Please take time to read the following information carefully, and do not hesitate to ask questions.<br><br> Please only sign the declaration of consent<br><ul><li>if you have fully understood the type and procedure of the study,</li><br><li>if you are willing to give your consent to participate, and</li><br><li> if you are aware of your rights as a participant in this study.</li></ul>",
    },
    {
      id: "txt1",
      type: "info",
      title: "1. What is the purpose of this study?",
      text: "In this study we aim to investigate how people approach and evaluate problem-solving puzzles.",
    },
    {
      id: "txt2",
      type: "info",
      title: "2. What is the procedure of the study?",
      text: "<p>In the beginning, you will fill out a questionnaire about problem solving. After that, you will receive detailed instructions on the problem-solving puzzles you will be presented with to evaluate and/or solve. At the end of the procedure, you will be asked to provide some additional information on your thought process during the task, and to provide feedback on the study (e.g., if you had technical issues). Your participation in the study is expected to take no more than 40 minutes. </p><p>During some parts of the study, which will be indicated to you, your mouse movements and/or eye movements will be tracked. The eye movements will be tracked using your webcam. However, all the processing of the webcam video will be done on your computer without the video being transferred to the study server. Only the coordinates of your gaze will be transferred, which are not personally identifying.</p>",
    },
    {
      id: "txt3",
      type: "info",
      title: "3. What are the benefits of participating in the study?",
      text: "Your participation will provide us with a better understanding of human problem-solving approaches. You will also be monetarily compensated for your participation (see Point 9). No other direct benefits of participating are expected. ",
    },
    {
      id: "txt4",
      type: "info",
      title: "4. What are the possible risks of taking part this study? Could participants experience any discomfort or other side effects? ",
      text: "No notable risks are expected due to taking part in this study. ",
    },
    {
      id: "txt5",
      type: "info",
      title: "5. Does participating in the study have any other effects on participants’ lifestyle? What are the obligations resulting from participating? ",
      text: "Participating in the present study has no notable consequences on your lifestyle. There are no obligations associated with your participation in the study. ",
    },
    {
      id: "txt6",
      type: "info",
      title: "6. What should participants do if they experience symptoms of complaints, unwanted side effects and/or injuries? ",
      text: "Should you experience any adverse events that occur due to the study, please contact the study coordinators. You are free to opt out of the study at any time. In case you experience adverse effects related to the study at a later point, please refer to point 10. ",
    },
    {
      id: "txt7",
      type: "info",
      title: "7. In what cases is it necessary that participants withdraw from the study early? ",
      text: "You can opt out and withdraw your consent to participate in the study at any time, without having to provide a reason, and without this being to your disadvantage. ",
    },
    {
      id: "txt8",
      type: "info",
      title: "8. How will the data collected in this study be used? ",
      text: "<p>Participants are first pseudonymized through Prolific’s security system with Prolific IDs. Researchers cannot access  participant’s other identifiable information. We will not request any information that may potentially reveal participants’ identity. In addition, the data will be anonymized by replacing Prolific IDs  with an alphanumeric code for the analysis. Then,  this anonymized data can be shared with other researchers or stored in an online database. In possible publications of the data collected in the course of this study, Prolific IDs will not be mentioned, and it will not be possible to draw any conclusions about the participants’ identity. Participants also have the possibility of deleting their data within 3 months after their participation in the study, without having to provide a reason. Should you wish to do so, please contact us through Prolific’s internal messaging service.</p>"
    },
    {
      id: "txt9",
      type: "info",
      title: "9. Will there be any costs for the participants? Will they receive reimbursement or remuneration? ",
      text: "You will not incur any costs from participating in this study. Your will receive a financial compensation of 6,5 USD for your participation through “Prolific”.",
    },
    {
      id: "txt10",
      type: "info",
      title: "10. Possibility to discuss further questions ",
      text: "The study coordinators are happy to answer any further questions you might have about the study and about the rights of participants in the study. Please reach out through Prolific’s internal messaging service.<br><br><i>Name(s) of the contact person(s):</i> Name: Dominik Pegler | Contact: through Prolific messaging system |",
    },
    {
      id: "txt10",
      type: "info",
      title: "11. Declaration of Consent",
      text: "<p>I agree to participate in the study “Understanding problem solving and evaluation in assignment tasks”.</p><p>The study coordinators provided me with clear and detailed information about the objectives, significance and scope of the study, as well as about the requirements resulting from my participation in the study. In addition, I have read this information text for participants and the declaration of consent, especially section 4 (regarding risks, discomforts or side effects). The study coordinator answered all my questions sufficiently and in a comprehensible manner. I had enough time to decide whether I would like to participate in this study. At the moment, I have no further questions. </p><p>I will follow the instructions that are necessary for conducting this study. However, I reserve the right to end my voluntary participation at any time, without this being to my disadvantage. If I want to withdraw from the study, I can do so at any time by contacting the study coordinators via Prolific’s internal messaging service. </p><p>At the same time, I agree that my data collected in this study are recorded and analyzed. </p><p> I agree that my data are permanently saved electronically in anonymized form (without a Prolific ID). Data that have only been pseudonymized (i.e., which still have a Prolific ID)  are stored in a form that is only accessible to the project management and are secured in accordance with current standards. My anonymized data can be shared with other researchers or stored in an online database.</p><p>If I want my data to be deleted at a later time, I can arrange for it by contacting one of the study coordinators through Prolific within 3 months of my participation, and without having to give a reason. </p><p>I have read and understood the information for participants. In the explanatory meeting, I had the opportunity to ask all the questions I was interested in. My questions were answered fully and in a comprehensible manner.</p>",
    },
    {
      id: "check1",
      type: "check",
      title: "Confirmation",
      text: "I have read and understood the information provided above. I agree to participate in this study willingly.",
    }
  ],
};
