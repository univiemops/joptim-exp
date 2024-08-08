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
import { useRouter } from "next/router";
import {
  handleSubmit1,
  handleSubmit2,
  handleUpdateUser,
  handleSubmitSurvey,
} from "../utils/submitFunctions";
import Head from "next/head";
import { UserDataProps } from "@/components/experiment/types";

// BEGIN: eye-tracking
import EyeTracking from "../eyetracking/EyeTracking";
import Calibration from "../eyetracking/Calibration";
// END: eye-tracking

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

const initialUserData: UserDataProps = {
  id: "",
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
  const [tileEvents, setTileEvents] = useState<
    Array<[number, [number, number]]>
  >([]);
  const [nTrialsSolving, setNTrialsSolving] = useState<number>();
  const [nTrialsPreference, setNTrialsPreference] = useState<number>();
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [tasks1, setTasks1] = useState<Array<number>>([]);
  const [tasks2, setTasks2] = useState<Array<number>>([]);
  const [workers1, setWorkers1] = useState<Array<number>>([]);
  const [workers2, setWorkers2] = useState<Array<number>>([]);
  const [solution1, setSolution1] = useState<Array<[number, number]>>([]);
  const [solution2, setSolution2] = useState<Array<[number, number]>>([]);
  const [assignmentsOptimal, setAssignmentsOptimal] = useState<
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
  const [prevUtility, setPrevUtility] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [indexSolvingTrial, setIndexSolvingTrial] = useState<number>();
  const [isTrialCompleted1, setTrialCompleted1] = useState<boolean>(true);
  const [indexPreferenceTrial, setIndexPreferenceTrial] = useState<number>();
  const [isTrialCompleted2, setTrialCompleted2] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataProps>(initialUserData);
  const router = useRouter();
  const { XID } = router.query;
  const [instructed, setInstructed] = React.useState<boolean>(false);
  const [ranEffect1, setRanEffect1] = useState<boolean>(false);
  const [ranEffect2, setRanEffect2] = useState<boolean>(false);
  const [completionURL, setCompletionURL] = useState<string>("");

  // BEGIN: eye-tracking
  const [webcamAvailable, setWebcamAvailable] = React.useState<boolean>(true);
  const [calibrated, setCalibrated] = React.useState<boolean>(false);
  const [accuracy, setAccuracy] = React.useState<number | null>(null);
  const [completedEverything, setCompletedEverything] =
    useState<boolean>(false);
  const handleCalibrated = () => {
    setCalibrated(true);
  };
  // END: eye-tracking

  const handleScrollToTop = () => {
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const fetchCompletionURL = () => {
    console.log("fetching completion URL for userData.id", userData.id);
    fetch(`${OPTIONAL_SUBURI}/completion-url/${userData.id || 0}`)
      .then((response) => response.json())
      .then((json) => {
        setCompletionURL(json["completion_url"]);
      })

      .catch((error) => {
        console.error(error);
        alert("Oops! Unable to connect to the server. Please try again later.");
      });
  };

  const fetchNumberOfTrials = () => {
    console.log("fetching number of trials for userData.id", userData.id);
    fetch(`${OPTIONAL_SUBURI}/n-trials/${userData.id || 0}`)
      .then((response) => response.json())
      .then((json) => {
        setNTrialsSolving(json["n_trials_solving"]);
        setNTrialsPreference(json["n_trials_preference"]);
        console.log("fetched numbers of trials.");
      })

      .catch((error) => {
        console.error(error);
        alert("Oops! Unable to connect to the server. Please try again later.");
      });
  };

  const fetchSolvingTrial = async (i: number) => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/new-solving-trial/${userData.id}/${i}`
      );

      // Check if the response status is not in the range 200-299
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}: ${errorData.detail}`
        );
      }

      const json = await response.json();

      setTasks(json["tasks"]);
      setWorkers(json["workers"]);
      setUtility(json["utility"]);
      setAssignmentsOptimal(json["example_solution"]);
      setAssignments([]);
      setLoading(false);
      console.log("Fetched solving trial", i, "for user", userData.id);
      console.log(json);
    } catch (error) {
      console.error("Fetching solving trials failed:", error);

      alert("Oops! Unable to connect to the server. Please try again later.");
    }
  };

  const fetchPreferenceTrial = async (i: number) => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/new-preference-trial/${userData.id}/${i}`
      );

      // Check if the response status is not in the range 200-299
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}: ${errorData.detail}`
        );
      }

      const json = await response.json();

      setTasks1(json["tasks_1"]);
      setWorkers1(json["workers_1"]);
      setTasks2(json["tasks_2"]);
      setWorkers2(json["workers_2"]);
      setUtility(json["utility"]);
      setSolution1(json["solution_1"]);
      setSolution2(json["solution_2"]);
      setLoading(false);
      console.log("Fetched preference trial", i, "for user", userData.id);
      console.log(json);
    } catch (error) {
      console.error("Fetching preference trials failed:", error);

      alert("Oops! Unable to connect to the server. Please try again later.");
    }
  };

  const setCSSvar = () => {
    if (!userData["trials_1"] && instructed) {
      console.log(
        "changed CSS for solving trials to",
        tasks.length,
        "rows and",
        workers.length,
        "columns"
      );
      document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
      document.documentElement.style.setProperty(`--cols`, `${workers.length}`);
    } else if (instructed) {
      console.log(
        "changed CSS for preference trials to",
        tasks1.length,
        "rows and",
        workers1.length,
        "columns"
      );

      console.log("workers1", workers1);

      // The assumption here is that tasks1 and tasks2 and workers2 and workers1 are of same length
      document.documentElement.style.setProperty(`--rows`, `${tasks1.length}`);
      document.documentElement.style.setProperty(
        `--cols`,
        `${workers2.length}`
      );
    }
  };

  const handleTrialComplete1 = () => {
    // solving trials
    if (startTime !== null) {
      const endTime: number = Date.now();
      console.log(
        "handleTrialComplete1(): endTime set",
        endTime,
        "duration:",
        (endTime - startTime) / 1000,
        "s"
      );
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
            endTime
          );
          setLoading(true);
          setPrevAssignments(assignments);
          setTrialCompleted1(true);
          if (
            indexSolvingTrial != null &&
            nTrialsSolving != null &&
            indexSolvingTrial < nTrialsSolving
          ) {
            fetchSolvingTrial(indexSolvingTrial);
            startTime = Date.now();
            console.log("handleTrialComplete1(): startTime set", startTime);
          }
          setTrialCompleted1(true);
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted."
          );
        }
      } else {
        console.error(
          "Variable endTime is not a valid number. Trial not submitted."
        );
      }
    }
  };

  const handleTrialComplete2 = (choice: number) => {
    // preference trials
    if (startTime !== null) {
      const endTime: number = Date.now();
      console.log(
        "handleTrialComplete2(): endTime set",
        endTime,
        "duration:",
        (endTime - startTime) / 1000,
        "s"
      );
      if (!isNaN(endTime)) {
        const xidFromUserData: string | boolean = userData["xid"];
        if (typeof xidFromUserData === "string") {
          handleSubmit2(
            xidFromUserData,
            tasks1,
            tasks2,
            workers1,
            workers2,
            solution1,
            solution2,
            startTime,
            endTime,
            choice
          );
          setLoading(true);
          setTrialCompleted2(true);
          if (
            indexPreferenceTrial != null &&
            nTrialsPreference != null &&
            indexPreferenceTrial < nTrialsPreference
          ) {
            fetchPreferenceTrial(indexPreferenceTrial);
            startTime = Date.now();
            console.log("handleTrialComplete2(): startTime set", startTime);
          }
        } else {
          console.error(
            "Variable xid is not a valid string. Trial not submitted."
          );
        }
      } else {
        console.error(
          "Variable endTime is not a valid number. Trial not submitted."
        );
      }
    }
  };

  const handleContinue1 = () => {
    console.log("Solving Trials: Continue Button Clicked!");
    startTime = Date.now();
    console.log("handleContinue1 (for solving): startTime set", startTime);
    if (
      indexSolvingTrial != null &&
      nTrialsSolving != null &&
      indexSolvingTrial >= nTrialsSolving
    ) {
      if (XID !== undefined && typeof XID === "string") {
        setUserData((prevUser) => ({ ...prevUser, trials_1: true }));
        handleUpdateUser(XID, "trials_1", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    if (indexSolvingTrial != null) {
      setIndexSolvingTrial(indexSolvingTrial + 1);
      setTrialCompleted1(false);
    }
  };

  const handleContinue2 = () => {
    console.log("Preference Trials: Continue Button Clicked!");
    startTime = Date.now();
    console.log("handleContinue1 (for solving): startTime set", startTime);

    if (
      indexPreferenceTrial != null &&
      nTrialsPreference != null &&
      indexPreferenceTrial >= nTrialsPreference
    ) {
      if (XID !== undefined && typeof XID === "string") {
        setUserData((prevUser) => ({ ...prevUser, trials_2: true }));
        handleUpdateUser(XID, "trials_2", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    if (indexPreferenceTrial != null) {
      setIndexPreferenceTrial(indexPreferenceTrial + 1);
      setTrialCompleted2(false);
    }
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
      handleUpdateUser(XID, "debrief", true);
      handleSubmitSurvey("debrief", XID, responses); // first entry defines the type of survey
      handleScrollToTop();
      setUserData((prevUser) => ({ ...prevUser, debrief: true }));
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
        `${OPTIONAL_SUBURI}/user-trials-1-completed/${XID}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const nTrialsNew = await res.json();
      setIndexSolvingTrial(nTrialsNew);
    } catch (error) {
      console.error(error);
    }

    try {
      const res = await fetch(
        `${OPTIONAL_SUBURI}/user-trials-2-completed/${XID}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const nTrialsNew = await res.json();
      setIndexPreferenceTrial(nTrialsNew);
    } catch (error) {
      console.error(error);
    }
  };

  // UE 1
  useEffect(() => {
    if (XID != undefined) {
      if (Array.isArray(XID)) {
        getUserData(XID[0]);
      } else {
        getUserData(XID);
      }
      fetchNumberOfTrials();
    }
  }, [XID]);

  // UE 2
  useEffect(() => {
    console.log("useEffect for setCssvar ran.");

    setCSSvar();
  }, [indexSolvingTrial, indexPreferenceTrial]);

  // UE 3: runs once to set the inital values solving trials
  useEffect(() => {
    if (
      !ranEffect1 &&
      isTrialCompleted1 &&
      indexSolvingTrial != null &&
      nTrialsSolving != null &&
      indexSolvingTrial < nTrialsSolving
    ) {
      console.log("useEffect for initial solving trial ran.");
      fetchSolvingTrial(indexSolvingTrial);
      setRanEffect1(true);
    }
  }, [
    ranEffect1,
    isTrialCompleted1,
    indexSolvingTrial,
    nTrialsSolving,
    fetchSolvingTrial,
  ]);

  // UE 4: runs once to set the inital values preference trials
  useEffect(() => {
    if (
      userData.trials_1 &&
      !ranEffect2 &&
      indexPreferenceTrial != null &&
      nTrialsPreference != null &&
      indexPreferenceTrial < nTrialsPreference
    ) {
      console.log("useEffect for initial preference trial ran.");
      fetchPreferenceTrial(indexPreferenceTrial);
      setRanEffect2(true);
    }
  }, [
    userData.trials_1,
    ranEffect2,
    indexPreferenceTrial,
    nTrialsPreference,
    fetchPreferenceTrial,
  ]);

  // UE 5
  // runs when a solving trial (part 1 of the experiment) is completed
  useEffect(() => {
    if (
      isTrialCompleted1 === false &&
      indexSolvingTrial != null &&
      nTrialsSolving != null &&
      indexSolvingTrial <= nTrialsSolving
    ) {
      setPrevTasks(tasks);
      setPrevWorkers(workers);
      setPrevUtility(utility);
      setPrevAssignmentsOptimal(assignmentsOptimal);
    }
  }, [isTrialCompleted1]);

  // UE 7
  useEffect(() => {
    fetchCompletionURL();
  }, []);

  // BEGIN: eye-tracking
  function areAllBooleanFieldsTrue(obj: UserDataProps) {
    for (const key in obj) {
      if (typeof obj[key] === "boolean" && !obj[key]) {
        return false;
      }
    }
    return true;
  }

  // UE 6
  useEffect(() => {
    setCompletedEverything(areAllBooleanFieldsTrue(userData));
  }, [userData]);

  const handleFail = () => {
    console.log("No webcam!");
    setWebcamAvailable(false);
  }; // TODO: needs a better solution that permanently check webcam access.

  // END: eye-tracking

  const renderMainContent = () => {
    // BEGIN: eye-tracking
    // Check if webcam available
    if (!webcamAvailable) {
      return (
        <div>
          <p>
            <b>No webcam detected.</b>
          </p>
          <p>Please refresh this page and allow webcam access.</p>
        </div>
      );
    }
    // END: eye-tracking

    // Check if consent was given
    if (!userData["consent"]) {
      return (
        <Consent
          onSubmit={handleFinishConsent}
          finished={userData["consent"]}
        />
      );
    }

    // Check if survey was taken
    else if (!userData["survey"]) {
      return <PSI onSubmit={handleFinishPSI} finished={userData["survey"]} />;
    }

    // Check if instructed
    else if (!instructed) {
      return <Instructions onSubmit={handleFinishInstructions} />;
    }

    // BEGIN: eye-tracking
    // Check if webcam is calibrated
    // else if (!calibrated && !completedEverything) {
    //   return (
    //     <Calibration
    //       onCalibrated={handleCalibrated}
    //       setAccuracy={setAccuracy}
    //       accuracy={accuracy}
    //     />
    //   );
    // }
    // END: eye-tracking

    // Check if solving trials completed
    else if (!userData["trials_1"]) {
      if (
        isTrialCompleted1 &&
        indexSolvingTrial != null &&
        nTrialsSolving != null
      ) {
        return (
          <ConfirmationPage
            trial={indexSolvingTrial}
            nTrials={nTrialsSolving}
            utility={getUtility(prevTasks, prevAssignments)}
            optimal_utility={prevUtility}
            assignments={prevAssignments}
            assignmentsOptimal={prevAssignmentsOptimal}
            tasks={prevTasks}
            workers={prevWorkers}
            onContinue={handleContinue1}
          />
        );
      }
      if (loading) {
        return <div className="loading-spinner"></div>;
      }
      if (indexSolvingTrial != null && nTrialsSolving != null) {
        return (
          <StimulusPage
            trial={indexSolvingTrial}
            nTrials={nTrialsSolving}
            assignments={assignments}
            setAssignments={setAssignments}
            tileEvents={tileEvents}
            setTileEvents={setTileEvents}
            tasks={tasks}
            workers={workers}
            onComplete={handleTrialComplete1}
          />
        );
      }
    }

    // Check if solving strategies completed
    else if (!userData["strategies_1"]) {
      return (
        <StrategiesSolving
          onSubmit={handleFinishStrategiesSolving}
          finished={userData["strategies_1"]}
        />
      );
    }

    // Check if preference trials completed
    else if (!userData["trials_2"]) {
      if (
        isTrialCompleted2 &&
        indexPreferenceTrial != null &&
        nTrialsPreference != null
      ) {
        return (
          <ConfirmationPage2
            trial={indexPreferenceTrial}
            nTrials={nTrialsPreference}
            onContinue={handleContinue2}
          />
        );
      }
      if (loading) {
        return <div className="loading-spinner"></div>;
      }
      if (indexPreferenceTrial != null && nTrialsPreference != null) {
        return (
          <StimulusPage2
            trial={indexPreferenceTrial}
            nTrials={nTrialsPreference}
            tasks1={tasks1}
            tasks2={tasks2}
            workers1={workers1}
            workers2={workers2}
            solution1={solution1}
            solution2={solution2}
            onComplete={handleTrialComplete2}
          />
        );
      }
    }

    // Check if preference strategies completed
    else if (!userData["strategies_2"]) {
      return (
        <Strategies
          onSubmit={handleFinishStrategies}
          finished={userData["strategies_2"]}
        />
      );
    }

    // Check if demographics completed
    else if (!userData["demographics"]) {
      return (
        <AdditionalDemographics
          onSubmit={handleFinishDemographics}
          finished={userData["demographics"]}
        />
      );
    }

    // if everything's finished show debrief
    else {
      return (
        <Debrief
          onSubmit={handleFinishDebrief}
          finished={userData["debrief"]}
          completionURL={completionURL}
        />
      );
    }
  };

  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>

      {/* BEGIN: eye-tracking */}

      {/* {instructed &&
      typeof XID === "string" &&
      completedEverything === false ? (
        <EyeTracking xid={XID} calibrated={calibrated} onFail={handleFail} />
      ) : null} */}

      {/* END: eye-tracking */}

      {userData["xid"] === "" ? <div></div> : renderMainContent()}
    </div>
  );
};
export default Experiment;
