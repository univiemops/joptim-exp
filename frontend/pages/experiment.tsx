import React from "react";
import { useState, useEffect } from "react";
import { getRandomIntInclusive, getUtility } from "../utils/helperFunctions";
import StimulusPage from "../components/experiment/StimulusPage";
import ConfirmationPage from "../components/experiment/ConfirmationPage";
import nTrialsIntro from "../constants/trials";
import { useRouter } from "next/router";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

const handleSubmit1 = async (
  xid: string,
  workers: Array<number>,
  tasks: Array<number>,
  assignments: Array<[number, number]>,
  reactionTime: number,
): Promise<void> => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/results/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xid: xid,
        result: {
          tasks: tasks,
          workers: workers,
          assignments: assignments,
          rt: reactionTime,
        },
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit data");
    }

    const json = await res.json();
  } catch (error) {
    console.error(error);
  }
};

interface UserDataProps {
  [key: string]: boolean | string; // Define allowed value types
}

const Experiment: React.FC = () => {
  const [assignments, setAssignments] = useState<Array<[number, number]>>([]);
  const [tasks, setTasks] = useState<Array<number>>([]);
  const [workers, setWorkers] = useState<Array<number>>([]);
  const [assignmentsOptimal, setAssignmentsOptimal] = useState<
    Array<[number, number]>
  >([]);
  const [utility, setUtility] = useState<number>(0);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [trial, setTrial] = useState<number>(0);
  const [isTrialCompleted1, setTrialCompleted1] = useState<boolean>(true);
  const [isCompleted1, setCompleted1] = useState<boolean>(false);
  const [trial2, setTrial2] = useState<number>(0);
  const [isTrialCompleted2, setTrialCompleted2] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataProps>({});
  const router = useRouter();
  const { XID } = router.query;

  const handleTrialComplete1 = () => {
    if (startTime !== null) {
      const endTime: number = performance.now();
      const reactionTime: number = endTime - startTime;

      if (!isNaN(reactionTime)) {
        handleSubmit1(
          userData["xid"],
          tasks,
          workers,
          assignments,
          reactionTime,
        );
        setTrialCompleted1(true);
      } else {
        console.error(
          "Variable reactionTime is not a valid number, submitted default value 0.",
        );
        handleSubmit1(userData["xid"], tasks, workers, assignments, 0);
        setTrialCompleted1(true);
      }

      startTime = null;
    }
  };

  const handleContinue1 = () => {
    if (trial === nTrialsIntro) {
      var userDataNew = userData;
      userDataNew["completed_1"] = true;
      setUserData(userDataNew);
      console.log(userData);
    }
    setTrial(trial + 1);
    setTrialCompleted1(false);
  };

  const getUserData = async (xid: string) => {
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
      console.log(json);
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

  useEffect(() => {
    if (isTrialCompleted1 === false) {
      const fetchGame = () => {
        setLoading(true);
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setUtility(json["utility"]);
            setAssignmentsOptimal(json["assignments_optimal"]);
            setDatabaseConnected(true);
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
          })
          .catch((error) => {
            console.log(error);
            alert(
              "Oops! Unable to connect to the server. Please try again later.",
            );
          });
      };
      startTime = performance.now();
      fetchGame();
    }
  }, [isTrialCompleted1]);

  return (
    <div className="App">
      <div className="App-header">
        {userData["completed_1"] === true ? (
          <div>
            Part one = done. thank you!
            <br /> Here we will soon include a text so you know what happens
            next (part two) <br /> ... as well as a <b>CONTINUE</b> button.
          </div>
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
        ) : (
          <StimulusPage
            trial={trial}
            loading={loading}
            assignments={assignments}
            setAssignments={setAssignments}
            tasks={tasks}
            workers={workers}
            databaseConnected={databaseConnected}
            onComplete={handleTrialComplete1}
          />
        )}
      </div>
    </div>
  );
};

export default Experiment;
