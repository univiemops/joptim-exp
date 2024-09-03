import React from "react";
import { useState, useEffect } from "react";
import StimulusPage2 from "../components/experiment/StimulusPage2";
import ConfirmationPage2 from "../components/experiment/ConfirmationPage2";
import Head from "next/head";
import { getURLParameter } from "../utils/webFunctions";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const Demo2: React.FC = () => {
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
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    const userIdUrl = getURLParameter("ID");

    if (userIdUrl && userIdUrl !== null) {
      const parsedUserId = parseInt(userIdUrl, 10);
      if (!isNaN(parsedUserId)) {
        setUserId(parsedUserId);
      } else {
        setUserId(123);
      }
    } else {
      setUserId(123);
    }
  }, []);

  const fetchNumberOfTrials = () => {
    console.log("fetching number of trials for userData.id", userId);
    fetch(`${OPTIONAL_SUBURI}/n-trials/${userId || 0}`)
      .then((response) => response.json())
      .then((json) => {
        setNTrialsPreference(json["n_trials_preference"]);
        console.log("fetched numbers of trials.");
      })

      .catch((error) => {
        console.error(error);
        alert("Oops! Unable to connect to the server. Please try again later.");
      });
  };

  const fetchPreferenceTrial = async (i: number) => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/new-preference-trial/${userId}/${i}`
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
      setSolution1(json["solution_1"]);
      setSolution2(json["solution_2"]);
      setTaskOrder1(json["task_order_1"]);
      setTaskOrder2(json["task_order_2"]);
      setLoading(false);
      console.log("Fetched preference trial", i, "for user", userId);
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

  const handleTrialComplete2 = (choice: number) => {
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

  const handleContinue2 = () => {
    if (indexPreferenceTrial != null) {
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
        <ConfirmationPage2
          trial={indexPreferenceTrial}
          nTrials={nTrialsPreference}
          onContinue={handleContinue2}
        />
      );
    }
    if (nTrialsPreference && indexPreferenceTrial > nTrialsPreference) {
      return <div>Finished. Press F5 to repeat.</div>;
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
export default Demo2;
