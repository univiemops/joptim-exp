import { UserDataProps } from "@/components/experiment/types";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

// type DynamicDictionary = Record<string, string | boolean>;

export const handleSubmit1 = async (
  xid: string,
  tasks: Array<number>,
  workers: Array<number>,
  assignments: Array<[number, number]>,
  tileEvents: Array<[number, [number, number]]>,
  startTime: number,
  endTime: number,
): Promise<void> => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/results-trials-1/`, {
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
          tileEvents: tileEvents,
          start_time: startTime,
          end_time: endTime,
        },
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit data");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleSubmit2 = async (
  xid: string,
  tasks1: Array<number>,
  tasks2: Array<number>,
  workers1: Array<number>,
  workers2: Array<number>,
  solution1: Array<[number, number]>,
  solution2: Array<[number, number]>,
  startTime: number,
  endTime: number,
  choice: number,
): Promise<void> => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/results-trials-2/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xid: xid,
        result: {
          tasks1: tasks1,
          tasks2: tasks2,
          workers1: workers1,
          workers2: workers2,
          solution1: solution1,
          solution2: solution2,
          start_time: startTime,
          end_time: endTime,
          choice: choice,
        },
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit data");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleSubmitSurvey = async (
  surveyId: string,
  xid: string,
  result: { [key: string]: string },
): Promise<void> => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/results-survey/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        survey_id: surveyId,
        xid: xid,
        result: result,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit data");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleUpdateUser = async (
  XID: string,
  field: keyof UserDataProps,
  value: boolean,
): Promise<void> => {
  const update: Record<string, any> = {};
  update["xid"] = XID;
  update[field as string] = value;  // Note: Ensure payload field is still a string
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/user-update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }
  } catch (error) {
    console.error(error);
  }
};


// export const handleUpdateUser = async (
//   XID: string,
//   field: string,
//   value: boolean,
// ): Promise<void> => {
//   const update: DynamicDictionary = {};
//   update["xid"] = XID;
//   update[field] = value;
//   try {
//     const res = await fetch(`${OPTIONAL_SUBURI}/user-update/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(update),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to update user");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
