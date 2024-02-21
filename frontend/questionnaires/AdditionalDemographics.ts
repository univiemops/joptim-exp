import {
  Questionnaire,
} from "../components/questionnaire/questionnaireTypes";

export const AdditionalDemographicsQuestionnaire: Questionnaire = {
  title: "",
  description: "",
  items: [
    {
      id: "1_handedness",
      type: "radio",
      title: "Handedness",
      text: "What is your dominant hand for writing and other precision tasks?",
      options: ["Left", "Right", "Use both hands equally"]
    },

    {
      id: "2_highest_edu",
      type: "radio",
      title: "Highest education level completed",
      text: "Which of these is the highest level of education you have completed?",
      options: ["No formal qualifications",
        "Secondary education (e.g. GED/GCSE)",
        "High school diploma/A-levels",
        "Technical/community college",
        "Undergraduate degree (BA/BSc/other)",
        "Graduate degree (MA/MSc/MPhil/other)",
        "Doctorate degree (PhD/other)",
        "Don't know / not applicableLeft"]
    },
    {
      id: "3_degree_subject",
      type: "radio",
      title: "Degree subject",
      text: "What subject area does your highest level degree most closely relate to?",
      options: [
        "Arts & Humanities",
        "Education",
        "Social Sciences",
        "Journalism & Information Business",
        "Administration & Law",
        "Mathematics and statistics",
        "Information and Communication Technologies",
        "Engineering, manufacturing and construction",
        "Agriculture, forestry, fisheries and veterinary",
        "Health and welfare",
        "Services",
        "Natural sciences",
        "History",
        "Other"
      ]
    },
  ],
};
