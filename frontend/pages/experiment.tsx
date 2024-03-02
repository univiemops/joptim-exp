import React from "react";
import { useState, useEffect } from "react";
import { getUtility } from "../utils/helperFunctions";
import StimulusPage from "../components/experiment/StimulusPage";
import StimulusPage2 from "../components/experiment/StimulusPage2";
import ConfirmationPage from "../components/experiment/ConfirmationPage";
import ConfirmationPage2 from "../components/experiment/ConfirmationPage2";
import Debrief from "../components/experiment/Debrief";
import AdditionalDemographics from "../components/experiment/AdditionalDemographics";
import Strategies from "../components/experiment/Strategies";
import StrategiesSolving from "../components/experiment/StrategiesSolving";
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
import Head from "next/head";
import { UserDataProps } from "@/components/experiment/types";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

const initialUserData: UserDataProps = {
  xid: "",
  consent: false,
  survey: false,
  trials_1: false,
  trials_2: false,
  strategies_1: false,
  strategies_2: false,
  demographics: false,
  debrief: false,
};

const Experiment: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tileEvents, setTileEvents] = useState<Array<[number, [number, number]]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [assignmentsOptimal, setAssignmentsOptimal] = useState<
    Array<[number, number]>
  >([]);
  const [assignmentsOptimal2, setAssignmentsOptimal2] = useState<
    Array<[number, number]>
  >([]);
  const [utility, setUtility] = useState<number>(0);
  const [prevTasks, setPrevTasks] = useState<Array<number>>([]);
  const [prevWorkers, setPrevWorkers] = useState<Array<number>>([]);
  const [prevAssignments, setPrevAssignments] = useState<
    Array<[number, number]>
  >([]);
  const [prevAssignmentsOptimal, setPrevAssignmentsOptimal] = useState<
    Array<[number, number]>
  >([]);
  const [prevAssignmentsOptimal2, setPrevAssignmentsOptimal2] = useState<
    Array<[number, number]>
  >([]);
  const [prevUtility, setPrevUtility] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [trial, setTrial] = useState<number>(0);
  const [isTrialCompleted1, setTrialCompleted1] = useState<boolean>(true);
  const [trial2, setTrial2] = useState<number>(0);
  const [isTrialCompleted2, setTrialCompleted2] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataProps>(initialUserData);
  const [completedEverything, setCompletedEverything] =
    useState<boolean>(false);
  const router = useRouter();
  const { XID } = router.query;
  const [instructed, setInstructed] = React.useState<boolean>(false);
  // remove this block if you do not need eyetracking
  const [webcamAvailable, setWebcamAvailable] = React.useState<boolean>(true);
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
      })
      .catch((error) => {
        console.error(error);
        alert("Oops! Unable to connect to the server. Please try again later.");
      });
  };

  const setCSSvar = () => {
    document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
    document.documentElement.style.setProperty(`--cols`, `${workers.length}`);
  };

  const handleTrialComplete1 = () => {
    if (startTime !== null) {
      const endTime: number = Date.now();

      if (!isNaN(endTime)) {
        const xidFromUserData: string | boolean = userData["xid"];
        if (typeof xidFromUserData === "string") {
          handleSubmit1(
            xidFromUserData,
            tasks,
            workers,
            assignments,
            tileEvents,
            startTime,
            endTime,
          );
          setLoading(true);
          setPrevAssignments(assignments);
          setTrialCompleted1(true);
          if (trial < nTrialsIntro) {
            fetchGame();
            startTime = Date.now();
            console.log("fetched game for part 1");
          }
          setTrialCompleted1(true);
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted.",
          );
        }
      } else {
        console.error(
          "Variable endTime is not a valid number. Trial not submitted.",
        );
      }
    }
  };

  const handleTrialComplete2 = (choice: number) => {
    if (startTime !== null) {
      const endTime: number = Date.now();
      if (!isNaN(endTime)) {
        const xidFromUserData: string | boolean = userData["xid"];
        if (typeof xidFromUserData === "string") {
          handleSubmit2(
            xidFromUserData,
            tasks,
            workers,
            assignmentsOptimal,
            assignmentsOptimal2,
            startTime,
            endTime,
            choice,
          );
          setLoading(true);
          setTrialCompleted2(true);
          if (trial2 < nTrialsMain) {
            fetchGame();
            startTime = Date.now();
            console.log("fetched game for part 2");
          }
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted.",
          );
        }
      } else {
        console.error(
          "Variable endTime is not a valid number. Trial not submitted.",
        );
      }
    }
  };

  const handleContinue1 = () => {
    if (trial >= nTrialsIntro) {
      if (XID !== undefined && typeof XID === "string") {
        setUserData((prevUser) => ({ ...prevUser, trials_1: true }));
        handleUpdateUser(XID, "trials_1", true);
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
        setUserData((prevUser) => ({ ...prevUser, trials_2: true }));
        handleUpdateUser(XID, "trials_2", true);
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
      handleSubmitSurvey("psi", XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishDebrief = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, debrief: true }));
      handleUpdateUser(XID, "debrief", true);
      handleSubmitSurvey("debrief", XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishStrategiesSolving = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, strategies_1: true }));
      handleUpdateUser(XID, "strategies_1", true);
      handleSubmitSurvey("strategies_1", XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishStrategies = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, strategies_2: true }));
      handleUpdateUser(XID, "strategies_2", true);
      handleSubmitSurvey("strategies_2", XID, responses); // first entry defines the type of survey
      handleScrollToTop();
    } else {
      console.error("XID is undefined or not a string");
    }
  };

  const handleFinishDemographics = (responses: Record<string, string>) => {
    if (XID !== undefined && typeof XID === "string") {
      setUserData((prevUser) => ({ ...prevUser, demographics: true }));
      handleUpdateUser(XID, "demographics", true);
      handleSubmitSurvey("demographics", XID, responses); // first entry defines the type of survey
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

  function areAllBooleanFieldsTrue(obj: UserDataProps) {
    for (const key in obj) {
      if (typeof obj[key] === "boolean" && !obj[key]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    setCompletedEverything(areAllBooleanFieldsTrue(userData));
  }, [userData]);

  useEffect(() => {
    if (XID != undefined) {
      if (Array.isArray(XID)) {
        getUserData(XID[0]);
      } else {
        getUserData(XID);
      }
    }
  }, [XID]);

  // runs on every trial change
  useEffect(() => {
    setCSSvar();
  }, [isTrialCompleted1, isTrialCompleted2]);

  // runs when Trial in part 1 is completed
  useEffect(() => {
    if (isTrialCompleted1 === false && trial <= nTrialsIntro) {
      setPrevTasks(tasks);
      setPrevWorkers(workers);
      setPrevUtility(utility);
      setPrevAssignmentsOptimal(assignmentsOptimal);
      setPrevAssignmentsOptimal2(assignmentsOptimal2);
    }
  }, [isTrialCompleted1]);

  // runs once to set the inital values
  // part 1
  let ranEffect = 0;
  useEffect(() => {
    if (ranEffect === 0) {
      fetchGame();
      startTime = Date.now();
      console.log("fetched inital game (part 1).");
      ranEffect = 1;
    }
  }, []);

  // runs once to set the inital values
  // part 2
  let ranEffect2 = 0;
  useEffect(() => {
    if (ranEffect2 === 0 && userData["trials_1"]) {
      fetchGame();
      startTime = Date.now();
      console.log("fetched inital game (part2).");
      ranEffect2 = 1;
    }
  }, [isTrialCompleted1]);

  // remove this if you do not need eyetracking
  const handleFail = () => {
    console.log("No webcam!");
    setWebcamAvailable(false);
  }; // TODO: needs a better solution that permanently check webcam access.

  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>
      {instructed &&
        typeof XID === "string" &&
        completedEverything === false ? ( // eyetracking
        <EyeTracking xid={XID} calibrated={calibrated} onFail={handleFail} /> // eyetracking
      ) : null}{" "}
      {/* remove this if you do not need eyetracking */}
      {userData["xid"] === "" ? (
        <div></div>
      ) : !webcamAvailable ? (
        <div>No webcam.</div>
      ) : userData["consent"] ? (
        userData["survey"] ? (
          instructed ? (
            calibrated || completedEverything ? ( // remove this conditional if you do not need eyetracking
              userData["trials_1"] ? (
                userData["strategies_1"] ? (
                  userData["trials_2"] ? (
                    userData["strategies_2"] ? (
                      userData["demographics"] ? (
                        <Debrief
                          onSubmit={handleFinishDebrief}
                          finished={userData["debrief"]}
                        />
                      ) : (
                        <AdditionalDemographics
                          onSubmit={handleFinishDemographics}
                          finished={userData["demographics"]}
                        />
                      )
                    ) : (
                      <Strategies
                        onSubmit={handleFinishStrategies}
                        finished={userData["strategies_2"]}
                      />
                    )
                  ) : isTrialCompleted2 ? (
                    <ConfirmationPage2
                      trial={trial2}
                      nTrials={nTrialsMain}
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
                    />
                  )
                ) : (
                  <StrategiesSolving
                    onSubmit={handleFinishStrategiesSolving}
                    finished={userData["strategies_1"]}
                  />
                )
              ) : isTrialCompleted1 ? (
                <ConfirmationPage
                  trial={trial}
                  nTrials={nTrialsIntro}
                  utility={getUtility(prevTasks, prevAssignments)}
                  optimal_utility={prevUtility}
                  assignments={prevAssignments}
                  assignmentsOptimal={prevAssignmentsOptimal}
                  tasks={prevTasks}
                  workers={prevWorkers}
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
                  tileEvents={tileEvents}
                  setTileEvents={setTileEvents}
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
