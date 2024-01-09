import React from "react";
import { useState, useEffect } from "react";
import { getRandomIntInclusive, getUtility } from "../utils/helperFunctions";
import StimulusPage from "../components/experiment/StimulusPage";
import StimulusPage2 from "../components/experiment/StimulusPage2";
import ConfirmationPage from "../components/experiment/ConfirmationPage";
import ConfirmationPage2 from "../components/experiment/ConfirmationPage2";
import { nTrialsIntro, nTrialsMain } from "../constants/trials";
import { useRouter } from "next/router";
import {
  handleSubmit1,
  handleSubmit2,
  handleUpdateUser,
} from "../utils/submitFunctions";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;
let startTime: number | null = null;

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
  const [assignmentsOptimal2, setAssignmentsOptimal2] = useState<
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
  const [choice, setChoice] = React.useState<number>(0);

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
            reactionTime,
          );
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
            reactionTime,
            choice,
          );
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
        const userDataNew = userData;
        userDataNew["completed_1"] = true;
        setUserData(userDataNew);
        handleUpdateUser(XID, "completed_1", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    // TODO increment should happen when trial results are uploaded
    // AND/OR number of completed trials should be taken from db
    // (rows in the results table for a given user)
    setTrial(trial + 1);
    setTrialCompleted1(false);
  };

  const handleContinue2 = () => {
    if (trial2 >= nTrialsMain) {
      if (XID !== undefined && typeof XID === "string") {
        const userDataNew = userData;
        userDataNew["completed_2"] = true;
        setUserData(userDataNew);
        handleUpdateUser(XID, "completed_2", true);
      } else {
        console.error("XID is undefined or not a string");
      }
    }
    // TODO increment should happen when trial results are uploaded
    // AND/OR number of completed trials should be taken from db
    // (rows in the results_dual table for a given user)
    setTrial2(trial2 + 1);
    setTrialCompleted2(false);
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
    if (isTrialCompleted1 === false) {
      const fetchGame = () => {
        setLoading(true);
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setUtility(json["utility"]);
            setAssignmentsOptimal(json["assignments_optimal_1"]);
            setAssignmentsOptimal2(json["assignments_optimal_2"]);
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
    if (isTrialCompleted2 === false) {
      const fetchGame = () => {
        setLoading(true);
        fetch(`${OPTIONAL_SUBURI}/game/`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json["tasks"]);
            setWorkers(json["agents"]);
            setUtility(json["utility"]);
            setAssignmentsOptimal(json["assignments_optimal_1"]);
            setAssignmentsOptimal2(json["assignments_optimal_2"]);
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
      {userData["completed_1"] === true ? (
        userData["completed_2"] === true ? (
          <div>
            <p>
              You have completed the experiment. Thank you for your
              participation.
            </p>
            <p>[Here will follow a short debrief and a redirect to prolific]</p>
          </div>
        ) : isTrialCompleted2 ? (
          <ConfirmationPage2 trial={trial2} onContinue={handleContinue2} />
        ) : (
          <StimulusPage2
            trial={trial2}
            loading={loading}
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
      ) : (
        <StimulusPage
          trial={trial}
          loading={loading}
          assignments={assignments}
          setAssignments={setAssignments}
          tasks={tasks}
          workers={workers}
          onComplete={handleTrialComplete1}
        />
      )}
    </div>
  );
};

export default Experiment;
