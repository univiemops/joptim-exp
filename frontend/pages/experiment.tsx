import React from "react";
import { useState, useEffect } from "react";
import { getUtility } from "../utils/helperFunctions";
import StimulusPage from "../components/experiment/StimulusPage";
import StimulusPage2 from "../components/experiment/StimulusPage2";
import ConfirmationPage from "../components/experiment/ConfirmationPage";
import ConfirmationPage2 from "../components/experiment/ConfirmationPage2";
import Debrief from "../components/experiment/Debrief";
import PSI from "../components/experiment/PSI";
import Consent from "../components/experiment/Consent";
import Instructions from "../components/experiment/Instructions";
import { nTrialsIntro, nTrialsMain } from "../constants/trials";
import { useRouter } from "next/router";
import {
  handleSubmit1,
  handleSubmit2,
  handleUpdateUser,
  handleSubmitSurvey,
} from "../utils/submitFunctions";
import EyeTracking from "../eyetracking/EyeTracking"; // remove this if you do not need eyetracking
import Calibration from "../eyetracking/Calibration"; // remove this if you do not need eyetracking
import Head from 'next/head'

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

interface UserDataProps {
  [key: string]: boolean | string; // Define allowed value types
}

interface UserDataProps {
  xid: string;
  consent: boolean;
  survey: boolean;
  completed_1: boolean;
  completed_2: boolean;
  notes: boolean;
}

const initialUserData: UserDataProps = {
  xid: "",
  consent: false,
  survey: false,
  completed_1: false,
  completed_2: false,
  notes: false,
};

const Experiment: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [assignmentsOptimal, setAssignmentsOptimal] = useState<
    Array<[number, number]>
  >([]);
  const [assignmentsOptimal2, setAssignmentsOptimal2] = useState<
    Array<[number, number]>
  >([]);
  const [utility, setUtility] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [trial, setTrial] = useState<number>(0);
  const [isTrialCompleted1, setTrialCompleted1] = useState<boolean>(true);
  const [trial2, setTrial2] = useState<number>(0);
  const [isTrialCompleted2, setTrialCompleted2] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataProps>(initialUserData);
  const router = useRouter();
  const { XID } = router.query;
  const [choice, setChoice] = React.useState<number>(0);
  const [instructed, setInstructed] = React.useState<boolean>(false);
  // remove this block if you do not need eyetracking
  const [calibrated, setCalibrated] = React.useState<boolean>(false);
  const [accuracy, setAccuracy] = React.useState<number | null>(null);
  const handleCalibrated = () => {
    setCalibrated(true);
  };

  const handleScrollToTop = () => {
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const handleTrialComplete1 = () => {
    if (startTime !== null) {
      const endTime: number = performance.now();
      const reactionTime: number = endTime - startTime;

      if (!isNaN(reactionTime)) {
        const xidFromUserData: string | boolean = userData["xid"];
        if (typeof xidFromUserData === "string") {
          handleSubmit1(
            xidFromUserData,
            tasks,
            workers,
            assignments,
            reactionTime, // TODO: use start and end time and compute RT in data analysis
          );
          setLoading(true);
          setTrialCompleted1(true);
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted.",
          );
        }
      } else {
        console.error(
          "Variable reactionTime is not a valid number. Trial not submitted.",
        );
      }

      startTime = null;
    }
  };

  const handleTrialComplete2 = () => {
    if (startTime !== null) {
      setChoice(0);
      const endTime: number = performance.now();
      const reactionTime: number = endTime - startTime;
      if (!isNaN(reactionTime)) {
        const xidFromUserData: string | boolean = userData["xid"];
        if (typeof xidFromUserData === "string") {
          handleSubmit2(
            xidFromUserData,
            tasks,
            workers,
            assignmentsOptimal,
            assignmentsOptimal2,
            reactionTime, // TODO: use start and end time and compute RT in data analysis
            choice,
          );
          setLoading(true);
          setTrialCompleted2(true);
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted.",
          );
        }
      } else {
        console.error(
          "Variable reactionTime is not a valid number. Trial not submitted.",
        );
      }

      startTime = null;
    }
  };

  const handleContinue1 = () => {
    if (trial >= nTrialsIntro) {
      if (XID !== undefined && typeof XID === "string") {
        setUserData((prevUser) => ({ ...prevUser, completed_1: true }));
        handleUpdateUser(XID, "completed_1", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    setTrial(trial + 1);
    setTrialCompleted1(false);
  };

  const handleContinue2 = () => {
    if (trial2 >= nTrialsMain) {
      if (XID !== undefined && typeof XID === "string") {
        setUserData((prevUser) => ({ ...prevUser, completed_2: true }));
        handleUpdateUser(XID, "completed_2", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    setTrial2(trial2 + 1);
    setTrialCompleted2(false);
  };

  // TODO: integrate all three into one function
  function handleFinishConsent(): void {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, consent: true }));
      handleUpdateUser(XID, "consent", true);
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  }

  const handleFinishPSI = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, survey: true }));
      handleUpdateUser(XID, "survey", true);
      handleSubmitSurvey(1, XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishDebrief = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, notes: true }));
      handleUpdateUser(XID, "notes", true);
      handleSubmitSurvey(2, XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishInstructions = () => {
    if (XID !== undefined && typeof XID === "string") {
      setInstructed(true);
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const getUserData = async (XID: string) => {
    try {
      const res = await fetch(`${OPTIONAL_SUBURI}/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xid: XID,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const json = await res.json();
      setUserData(json);
    } catch (error) {
      console.error(error);
    }
    try {
      const res = await fetch(
        `${OPTIONAL_SUBURI}/user-trials-completed/${XID}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const nTrialsNew = await res.json();
      setTrial(nTrialsNew);
    } catch (error) {
      console.error(error);
    }

    try {
      const res = await fetch(
        `${OPTIONAL_SUBURI}/user-trials-dual-completed/${XID}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const nTrialsNew = await res.json();
      setTrial2(nTrialsNew);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (XID != undefined) {
      if (Array.isArray(XID)) {
        getUserData(XID[0]);
      } else {
        getUserData(XID);
      }
    }
  }, [XID]);

  // runs when Trial in part 1 is completed
  useEffect(() => {
    if (isTrialCompleted1 === false && trial <= nTrialsIntro) {
      const fetchGame = () => {
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setUtility(json["utility"]);
            setAssignmentsOptimal(json["assignments_optimal_1"]);
            setAssignmentsOptimal2(json["assignments_optimal_2"]);
            setAssignments([]);
            setLoading(false);
            document.documentElement.style.setProperty(
              `--rows`,
              `${json["tasks"].length}`,
            );
            document.documentElement.style.setProperty(
              `--cols`,
              `${json["agents"].length}`,
            );
            console.log("new tasks:", json["tasks"])
          })
          .catch((error) => {
            console.error(error);
            alert(
              "Oops! Unable to connect to the server. Please try again later.",
            );
          });
      };
      startTime = performance.now();
      fetchGame();
    }
  }, [isTrialCompleted1]);

  // runs when Trial in part 2 is completed
  useEffect(() => {
    if (isTrialCompleted2 === false && trial2 <= nTrialsMain) {
      const fetchGame = () => {
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setUtility(json["utility"]);
            setAssignmentsOptimal(json["assignments_optimal_1"]);
            setAssignmentsOptimal2(json["assignments_optimal_2"]);
            setAssignments([]);
            setLoading(false);
            document.documentElement.style.setProperty(
              `--rows`,
              `${json["tasks"].length}`,
            );
            document.documentElement.style.setProperty(
              `--cols`,
              `${json["agents"].length}`,
            );
            console.log("new tasks:", json["tasks"])
          })
          .catch((error) => {
            console.error(error);
            alert(
              "Oops! Unable to connect to the server. Please try again later.",
            );
          });
      };
      startTime = performance.now();
      fetchGame();
    }
  }, [isTrialCompleted2]);
  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>
      {instructed && typeof XID === "string" ? ( // remove this parenthesis if you do not need eyetracking
        <EyeTracking xid={XID} calibrated={calibrated} />
      ) : null}{" "}
      {/* remove this if you do not need eyetracking */}
      {userData["xid"] === "" ? (
        <div></div>
      ) : userData["consent"] ? (
        userData["survey"] ? (
          instructed ? (
            calibrated ? ( // remove this conditional if you do not need eyetracking
              userData["completed_1"] ? (
                userData["completed_2"] ? (
                  <Debrief
                    onSubmit={handleFinishDebrief}
                    finished={userData["notes"]}
                  />
                ) : isTrialCompleted2 ? (
                  <ConfirmationPage2
                    trial={trial2}
                    onContinue={handleContinue2}
                  />
                ) : loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <StimulusPage2
                    trial={trial2}
                    nTrials={nTrialsMain}
                    assignments1={assignmentsOptimal}
                    assignments2={assignmentsOptimal2}
                    tasks={tasks}
                    workers={workers}
                    onComplete={handleTrialComplete2}
                    setChoice={setChoice}
                    choice={choice}
                  />
                )
              ) : isTrialCompleted1 ? (
                <ConfirmationPage
                  trial={trial}
                  utility={getUtility(tasks, assignments)}
                  optimal_utility={utility}
                  assignments={assignments}
                  assignmentsOptimal={assignmentsOptimal}
                  tasks={tasks}
                  workers={workers}
                  onContinue={handleContinue1}
                />
              ) : loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <StimulusPage
                  trial={trial}
                  nTrials={nTrialsIntro}
                  assignments={assignments}
                  setAssignments={setAssignments}
                  tasks={tasks}
                  workers={workers}
                  onComplete={handleTrialComplete1}
                />
              )
            ) : (
              <Calibration
                onCalibrated={handleCalibrated}
                setAccuracy={setAccuracy}
                accuracy={accuracy}
              /> /* remove this if you do not need eyetracking */
            )
          ) : (
            <Instructions onSubmit={handleFinishInstructions} />
          )
        ) : (
          <PSI onSubmit={handleFinishPSI} finished={userData["survey"]} />
        )
      ) : (
        <Consent
          onSubmit={handleFinishConsent}
          finished={userData["consent"]}
        />
      )}
    </div>
  );
};
export default Experiment;
