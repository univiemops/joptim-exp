import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import GAP from "../components/GAP/GAP";
import { Button } from "@mui/material";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const Demo1: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [allAssignments, setAllAssignments] = useState<any>([]);
  const [id, setId] = useState<number>(0);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [utility, setUtility] = useState<number>(0);
  const [ranEffect1, setRanEffect1] = useState<boolean>(false);

  const fetchProblem = async () => {
    try {
      const response = await fetch(
        `${OPTIONAL_SUBURI}/a-problem-with-many-solutions/`
      );

      // Check if the response status is not in the range 200-299
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}: ${errorData.detail}`
        );
      }

      const json = await response.json();

      setTasks(json["task_loads"]);
      setWorkers(json["worker_capacities"]);
      setUtility(json["utility"]);
      setAllAssignments(json["optimal_solutions"]);
      console.log("Fetched problem with many solutions");
      console.log(json);
    } catch (error) {
      console.error("Fetching problem with many solutions failed:", error);

      alert("Oops! Unable to connect to the server. Please try again later.");
    }
  };

  const handleNext = () => {
    console.log("clicked", id, id + 1);
    setId(id + 1);
    setAssignments(allAssignments[id]);
  };

  const setCSSvar = () => {
    console.log(
      "changed CSS for trials to",
      tasks.length,
      "rows and",
      workers.length,
      "columns"
    );
    document.documentElement.style.setProperty(`--rows`, `${tasks.length}`);
    document.documentElement.style.setProperty(`--cols`, `${workers.length}`);
  };

  useEffect(() => {
    console.log("useEffect for setCssvar ran.");
    setCSSvar();
  }, [tasks]);

  useEffect(() => {
    if (!ranEffect1) {
      fetchProblem();
      setRanEffect1(true);
    }
  }, [ranEffect1, fetchProblem]);

  const renderMainContent = () => {
    if (tasks && workers && assignments) {
      return (
        <GAP
          tasks={tasks}
          assignments={assignments}
          workers={workers}
          freeze={true}
          icons={true}
        />
      );
    }
  };

  console.log(assignments);

  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>
      <span style={{ fontSize: "xx-large", fontWeight: "bold" }}>
        A Problem With Many Optimal Solutions
      </span>
      {renderMainContent()}
      <Button
        size="large"
        variant="contained"
        style={{
          fontSize: "x-large",
          background: "#000000",
          textTransform: "none",
          padding: ".3rem 3rem .3rem 3rem",
        }}
        onClick={() => handleNext()}
      >
        NEXT SOLUTION
      </Button>
    </div>
  );
};
export default Demo1;
