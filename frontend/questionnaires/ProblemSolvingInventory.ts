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
      type: "likertLabels",
      title: "",
      text: "When a solution to a problem was unsuccessful, I do not examine why it didn't work.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "2",
      type: "likertLabels",
      title: "",
      text: "When I am confronted with a complex problem, I do not bother to develop a strategy to collect information so I can define exactly what the problem is.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "3",
      type: "likertLabels",
      title: "",
      text: "When my first efforts to solve a problem fail, I become uneasy about my ability to handle the situation.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "4",
      type: "likertLabels",
      title: "",
      text: "After I have solved a problem, I do not analyze what went right or what went wrong.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "5",
      type: "likertLabels",
      title: "",
      text: "I am usually able to think up creative and effective alternatives to solve a problem.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "6",
      type: "likertLabels",
      title: "",
      text: "After I have tried to solve a problem with a certain course of action, I take time and compare the actual outcome to what I thought should have happened.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "7",
      type: "likertLabels",
      title: "",
      text: "When I have a problem, I think up as many possible ways to handle it as I can until I can't come up with any more ideas.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "8",
      type: "likertLabels",
      title: "",
      text: "When confronted with a problem, I consistently examine my feelings to find out what is going on in a problem situation.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "10",
      type: "likertLabels",
      title: "",
      text: "I have the ability to solve most problems even though initially no solution is immediately apparent.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "11",
      type: "likertLabels",
      title: "",
      text: "Many problems I face are too complex for me to solve.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "12",
      type: "likertLabels",
      title: "",
      text: "I make decisions and am happy with them later.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "13",
      type: "likertLabels",
      title: "",
      text: "When confronted with a problem, I tend to do the first thing that I can think of to solve it.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "15",
      type: "likertLabels",
      title: "",
      text: "When deciding on an idea or possible solution to a problem, I do not take time to consider the chances of each alternative being successful.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "16",
      type: "likertLabels",
      title: "",
      text: "When confronted with a problem, I stop and think about it before deciding on a next step.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "17",
      type: "likertLabels",
      title: "",
      text: "I generally go with the first good idea that comes to my mind.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "18",
      type: "likertLabels",
      title: "",
      text: "When making a decision, I weigh the consequences of each alternative and compare them against each other.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "19",
      type: "likertLabels",
      title: "",
      text: "When I make plans to solve a problem, I am almost certain that I can make them work.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "20",
      type: "likertLabels",
      title: "",
      text: "I try to predict the overall result of carrying out a particular course of action,",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "21",
      type: "likertLabels",
      title: "",
      text: "When I try to think up possible solutions to a problem, I do not come up with very many alternatives.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "23",
      type: "likertLabels",
      title: "",
      text: "Given enough time and effort, I believe I can solve most problems that confront me.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "24",
      type: "likertLabels",
      title: "",
      text: "When faced with a novel situation I have confidence that I can handle problems that may arise.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "25",
      type: "likertLabels",
      title: "",
      text: "Even though I work on a problem, sometimes I feel like I am groping or wandering, and am not getting down to the real issue.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "26",
      type: "likertLabels",
      title: "",
      text: "I make snap judgments and later regret them.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "27",
      type: "likertLabels",
      title: "",
      text: "I trust my ability to solve new and difficult problems.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "28",
      type: "likertLabels",
      title: "",
      text: "I have a systematic method for comparing alternatives and making decisions.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "30",
      type: "likertLabels",
      title: "",
      text: "When confronted with a problem, I do not usually examine what sort of external things my environment may be contributing to my problem.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "31",
      type: "likertLabels",
      title: "",
      text: "When I am confused by a problem, one of the first things I do is survey the situation and consider all the relevant pieces of information.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "32",
      type: "likertLabels",
      title: "",
      text: "Sometimes I get so charged up emotionally that I am unable to consider many ways of dealing with my problems.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "33",
      type: "likertLabels",
      title: "",
      text: "After making a decision, the outcome I expected usually matches the actual outcome.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "34",
      type: "likertLabels",
      title: "",
      text: "When confronted with a problem, I am unsure of whether I can handle the situation.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
    {
      id: "35",
      type: "likertLabels",
      title: "",
      text: "When I become aware of a problem, one of the first things I do is to try to find out exactly what the problem is.",
      options: {
        labels: {
          1: "strongly disagree",
          2: "moderately disagree",
          3: "slightly disagree",
          4: "slightly agree",
          5: "moderately agree",
          6: "strongly agree",
        }
      },
    },
  ],
};
