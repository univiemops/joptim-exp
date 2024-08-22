import React from "react";
import { useState, useEffect } from "react";
import { getUtility } from "../utils/helperFunctions";
import StimulusPage from "../components/experiment/StimulusPage";
import ConfirmationPage from "../components/experiment/ConfirmationPage";
import Head from "next/head";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const Demo1: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tileEvents, setTileEvents] = useState<
    Array<[number, [number, number]]>
  >([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
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
  const [indexSolvingTrial, setIndexSolvingTrial] = useState<number>(0);
  const [isTrialCompleted1, setTrialCompleted1] = useState<boolean>(true);
  const [ranEffect1, setRanEffect1] = useState<boolean>(false);

  const userId = 123;
  const nTrialsSolving = 500;

  const fetchSolvingTrial = async (i: number) => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/new-solving-trial/${userId}/${i}`
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
      console.log("Fetched solving trial", i, "for user", userId);
      console.log(json);
    } catch (error) {
      console.error("Fetching solving trials failed:", error);

      alert("Oops! Unable to connect to the server. Please try again later.");
    }
  };

  const setCSSvar = () => {
    console.log(
      "changed CSS for trials to",
      tasks.length,
      "rows and",
      workers.length,
      "columns"
    );
    console.log("workers", workers);
    document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
    document.documentElement.style.setProperty(`--cols`, `${workers.length}`);
  };

  const handleTrialComplete1 = () => {
    setLoading(true);
    setPrevAssignments(assignments);
    setTrialCompleted1(true);
    if (
      indexSolvingTrial != null &&
      nTrialsSolving != null &&
      indexSolvingTrial < nTrialsSolving
    ) {
      fetchSolvingTrial(indexSolvingTrial);
    }
    setTrialCompleted1(true);
  };

  const handleContinue1 = () => {
    if (indexSolvingTrial != null) {
      setIndexSolvingTrial(indexSolvingTrial + 1);
      setTrialCompleted1(false);
    }
  };

  useEffect(() => {
    console.log("useEffect for setCssvar ran.");

    setCSSvar();
  }, [indexSolvingTrial]);

  // runs once to set the inital values solving trials
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
  }, [ranEffect1, isTrialCompleted1, indexSolvingTrial, fetchSolvingTrial]);

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

  const renderMainContent = () => {
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
export default Demo1;
