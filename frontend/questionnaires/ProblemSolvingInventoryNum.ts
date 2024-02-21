import { Questionnaire } from "../components/questionnaire/questionnaireTypes";

// 3 factors:
// Problem-solving confidence (5, 10, 11, 12, 19, 23, 24, 27, 33, 34, 35)
// Approach avoidance style (1, 2, 4, 6, 7, 8, 13, 15, 16, 17, 18, 20, 21, 28, 30, 31)
// Personal control (3, 14, 25, 26, 32)

export const ProblemSolvingInventory: Questionnaire = {
  title: "Problem-Solving Inventory",
  description:
    "This questionnaire measures the participant's perceived competency in addressing and resolving various life challenges and difficulties.",
  items: [
    {
      id: "1",
      type: "likert",
      title: "",
      text: "When a solution to a problem was unsuccessful, I do <b>not</b> examine why it didn't work.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "2",
      type: "likert",
      title: "",
      text: "When I am confronted with a complex problem, I do <b>not</b> bother to develop a strategy to collect information so I can define exactly what the problem is.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "3",
      type: "likert",
      title: "",
      text: "When my first efforts to solve a problem fail, I become uneasy about my ability to handle the situation.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "4",
      type: "likert",
      title: "",
      text: "After I have solved a problem, I do <b>not</b> analyze what went right or what went wrong.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "5",
      type: "likert",
      title: "",
      text: "I am usually able to think up creative and effective alternatives to solve a problem.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "6",
      type: "likert",
      title: "",
      text: "After I have tried to solve a problem with a certain course of action, I take time and compare the actual outcome to what I thought should have happened.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "7",
      type: "likert",
      title: "",
      text: "When I have a problem, I think up as many possible ways to handle it as I can until I can't come up with any more ideas.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "8",
      type: "likert",
      title: "",
      text: "When confronted with a problem, I consistently examine my feelings to find out what is going on in a problem situation.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "10",
      type: "likert",
      title: "",
      text: "I have the ability to solve most problems even though initially no solution is immediately apparent.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "11",
      type: "likert",
      title: "",
      text: "Many problems I face are too complex for me to solve.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "12",
      type: "likert",
      title: "",
      text: "I make decisions and am happy with them later.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "13",
      type: "likert",
      title: "",
      text: "When confronted with a problem, I tend to do the first thing that I can think of to solve it.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "15",
      type: "likert",
      title: "",
      text: "When deciding on an idea or possible solution to a problem, I do <b>not</b> take time to consider the chances of each alternative being successful.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "16",
      type: "likert",
      title: "",
      text: "When confronted with a problem, I stop and think about it before deciding on a next step.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "17",
      type: "likert",
      title: "",
      text: "I generally go with the first good idea that comes to my mind.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "18",
      type: "likert",
      title: "",
      text: "When making a decision, I weigh the consequences of each alternative and compare them against each other.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "19",
      type: "likert",
      title: "",
      text: "When I make plans to solve a problem, I am almost certain that I can make them work.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "20",
      type: "likert",
      title: "",
      text: "I try to predict the overall result of carrying out a particular course of action.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "21",
      type: "likert",
      title: "",
      text: "When I try to think up possible solutions to a problem, I do <b>not</b> come up with very many alternatives.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "23",
      type: "likert",
      title: "",
      text: "Given enough time and effort, I believe I can solve most problems that confront me.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "24",
      type: "likert",
      title: "",
      text: "When faced with a novel situation I have confidence that I can handle problems that may arise.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "25",
      type: "likert",
      title: "",
      text: "Even though I work on a problem, sometimes I feel like I am groping or wandering, and am <b>not</b> getting down to the real issue.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "26",
      type: "likert",
      title: "",
      text: "I make snap judgments and later regret them.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "27",
      type: "likert",
      title: "",
      text: "I trust my ability to solve new and difficult problems.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "28",
      type: "likert",
      title: "",
      text: "I have a systematic method for comparing alternatives and making decisions.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "30",
      type: "likert",
      title: "",
      text: "When confronted with a problem, I do <b>not</b> usually examine what sort of external things my environment may be contributing to my problem.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "31",
      type: "likert",
      title: "",
      text: "When I am confused by a problem, one of the first things I do is survey the situation and consider all the relevant pieces of information.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "32",
      type: "likert",
      title: "",
      text: "Sometimes I get so charged up emotionally that I am unable to consider many ways of dealing with my problems.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "33",
      type: "likert",
      title: "",
      text: "After making a decision, the outcome I expected usually matches the actual outcome.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "34",
      type: "likert",
      title: "",
      text: "When confronted with a problem, I am unsure of whether I can handle the situation.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
    {
      id: "35",
      type: "likert",
      title: "",
      text: "When I become aware of a problem, one of the first things I do is to try to find out exactly what the problem is.",
      options: {
        length: 6,
        rightLabel: "strongly agree",
        leftLabel: "strongly disagree",
      },
    },
  ],
};
