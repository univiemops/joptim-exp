import React from "react";
import { useState, useEffect } from "react";
import StimulusPage2 from "./StimulusPage2";
import ConfirmationPage2Practice from "./ConfirmationPage2Practice";
import Head from "next/head";
import { Button } from "@mui/material";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const Practice: React.FC<{
  onFinish: () => void;
}> = ({ onFinish }) => {
  const [tasks1, setTasks1] = useState<Array<number>>([]);
  const [tasks2, setTasks2] = useState<Array<number>>([]);
  const [workers1, setWorkers1] = useState<Array<number>>([]);
  const [workers2, setWorkers2] = useState<Array<number>>([]);
  const [taskOrder1, setTaskOrder1] = useState<Array<number>>([]);
  const [taskOrder2, setTaskOrder2] = useState<Array<number>>([]);
  const [solution1, setSolution1] = useState<Array<[number, number]>>([]);
  const [solution2, setSolution2] = useState<Array<[number, number]>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [indexPreferenceTrial, setIndexPreferenceTrial] = useState<number>(0);
  const [isTrialCompleted2, setTrialCompleted2] = useState<boolean>(true);
  const [ranEffect2, setRanEffect2] = useState<boolean>(false);
  const [nTrialsPreference, setNTrialsPreference] = useState<number>();
  const [choice, setChoice] = useState<number>();
  const [trialType, setTrialType] = useState<string>("");
  const [trialTypePrev, setTrialTypePrev] = useState<string>("");
  const [tasks1Prev, setTasks1Prev] = useState<Array<number>>([]);
  const [tasks2Prev, setTasks2Prev] = useState<Array<number>>([]);
  const [workers1Prev, setWorkers1Prev] = useState<Array<number>>([]);
  const [workers2Prev, setWorkers2Prev] = useState<Array<number>>([]);
  const [taskOrder1Prev, setTaskOrder1Prev] = useState<Array<number>>([]);
  const [taskOrder2Prev, setTaskOrder2Prev] = useState<Array<number>>([]);
  const [solution1Prev, setSolution1Prev] = useState<Array<[number, number]>>(
    []
  );
  const [solution2Prev, setSolution2Prev] = useState<Array<[number, number]>>(
    []
  );
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [mistakes, setMistakes] = useState<boolean>(false);

  const fetchNumberOfTrials = () => {
    console.log("fetching number of practice trials");

    // TODO: change API call and remove 123
    fetch(`${OPTIONAL_SUBURI}/n-preference-practice-trials`)
      .then((response) => response.json())
      .then((json) => {
        setNTrialsPreference(json["n_trials_preference_practice"]);
        console.log("fetched number of practice trials.");
      })

      .catch((error) => {
        console.error(error);
        alert("Oops! Unable to connect to the server. Please try again later.");
      });
  };

  const fetchPreferenceTrial = async (i: number) => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/new-preference-practice-trial/${i}`
      );

      // Check if the response status is not in the range 200-299
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}: ${errorData.detail}`
        );
      }

      const json = await response.json();
      setTrialType(json["type"][0]);
      setTasks1(json["tasks_1"]);
      setWorkers1(json["workers_1"]);
      setTasks2(json["tasks_2"]);
      setWorkers2(json["workers_2"]);
      setSolution1(json["solution_1"]);
      setSolution2(json["solution_2"]);
      setTaskOrder1(json["task_order_1"]);
      setTaskOrder2(json["task_order_2"]);
      setLoading(false);
      console.log("Fetched preference practice trial", i);
      console.log(json);
    } catch (error) {
      console.error("Fetching preference trials failed:", error);

      alert("Oops! Unable to connect to the server. Please try again later.");
    }
  };

  const setCSSvar = () => {
    console.log(
      "changed CSS for preference trials to",
      tasks1.length,
      "rows and",
      workers1.length,
      "columns"
    );

    // The assumption here is that tasks1 and tasks2 and workers2 and workers1 are of same length
    document.documentElement.style.setProperty(`--rows`, `${tasks1.length}`);
    document.documentElement.style.setProperty(`--cols`, `${workers2.length}`);
  };

  const handleTrialComplete2 = (c: number) => {
    setChoice(c);
    setTrialTypePrev(trialType);
    setTasks1Prev(tasks1);
    setWorkers1Prev(workers1);
    setTasks2Prev(tasks2);
    setWorkers2Prev(workers2);
    setSolution1Prev(solution1);
    setSolution2Prev(solution2);
    setTaskOrder1Prev(taskOrder1);
    setTaskOrder2Prev(taskOrder2);
    setLoading(true);
    setTrialCompleted2(true);
    if (
      indexPreferenceTrial != null &&
      nTrialsPreference != null &&
      indexPreferenceTrial < nTrialsPreference
    ) {
      fetchPreferenceTrial(indexPreferenceTrial);
    }
  };

  const handleMistake = () => {
    setMistakes(true);
  };

  const handleRepeatPractice = () => {
    setIndexPreferenceTrial(0);
    fetchPreferenceTrial(0);
    setTrialCompleted2(true);
    setReachedEnd(false);
    setMistakes(false);
  };

  const handleContinue2 = () => {
    if (indexPreferenceTrial != null) {
      if (nTrialsPreference && indexPreferenceTrial >= nTrialsPreference) {
        console.log("Reached end of practice!");
        setReachedEnd(true);
        if (!mistakes) {
          console.log("Practice finished!");
          onFinish();
        }
      }

      setIndexPreferenceTrial(indexPreferenceTrial + 1);
      setTrialCompleted2(false);
    }
  };

  useEffect(() => {
    fetchNumberOfTrials();
  }, []);

  useEffect(() => {
    console.log("useEffect for setCssvar ran.");

    setCSSvar();
  }, [indexPreferenceTrial]);

  // runs once to set the inital values preference trials
  useEffect(() => {
    if (
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
    ranEffect2,
    indexPreferenceTrial,
    nTrialsPreference,
    fetchPreferenceTrial,
  ]);

  const renderMainContent = () => {
    if (
      isTrialCompleted2 &&
      indexPreferenceTrial != null &&
      nTrialsPreference != null
    ) {
      return (
        <ConfirmationPage2Practice
          choice={choice}
          trialType={trialTypePrev}
          trial={indexPreferenceTrial}
          nTrials={nTrialsPreference}
          tasks1={tasks1Prev}
          tasks2={tasks2Prev}
          workers1={workers1Prev}
          workers2={workers2Prev}
          taskOrder1={taskOrder1Prev}
          taskOrder2={taskOrder2Prev}
          solution1={solution1Prev}
          solution2={solution2Prev}
          onContinue={handleContinue2}
          onMistake={handleMistake}
        />
      );
    }

    if (reachedEnd) {
      if (!mistakes) {
        return <div>Practice finished. Continuing with main experiment.</div>;
      } else {
        return (
          <div
            id="confirmation-page-2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "min(100%,900px)",
            }}
          >
            <div
              id="confirmation-page-2-inner"
              style={{
                color: "black",
                fontSize: "x-large",
                margin: "2rem",
                maxWidth: "100%",
                fontWeight: "bold",
              }}
            >
              Practice Trials Unsuccessful
            </div>
            <span
              style={{ color: "black", fontSize: "x-large", margin: "2rem" }}
            >
              You did not successfully complete the practice trials. Please
              review the instructions and attempt them again to ensure you
              understand the task. Click "REPEAT PRACTICE" to repeat the
              practice trials.{" "}
            </span>

            <Button
              size="large"
              variant="contained"
              style={{
                fontSize: "x-large",
                background: "#000000",
                textTransform: "none",
                padding: ".3rem 3rem .3rem 3rem",
                margin: "0.9rem 0.9rem 0.9rem 0.9rem",
              }}
              onClick={handleRepeatPractice}
            >
              REPEAT PRACTICE
            </Button>
          </div>
        );
      }
    }

    if (
      nTrialsPreference &&
      loading &&
      indexPreferenceTrial < nTrialsPreference
    ) {
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
          taskOrder1={taskOrder1}
          taskOrder2={taskOrder2}
          solution1={solution1}
          solution2={solution2}
          onComplete={handleTrialComplete2}
        />
      );
    }
  };

  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>
      {renderMainContent()}
    </div>
  );
};
export default Practice;
