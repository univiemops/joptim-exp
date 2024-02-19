const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

type DynamicDictionary = Record<string, string | boolean>;

export const handleSubmit1 = async (
  xid: string,
  workers: Array<number>,
  tasks: Array<number>,
  assignments: Array<[number, number]>,
  startTime: number,
  endTime: number,
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
  workers: Array<number>,
  tasks: Array<number>,
  assignments1: Array<[number, number]>,
  assignments2: Array<[number, number]>,
  startTime: number,
  endTime: number,
  choice: number,
): Promise<void> => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/results-dual/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xid: xid,
        result: {
          tasks: tasks,
          workers: workers,
          assignments_1: assignments1,
          assignments_2: assignments2,
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
  field: string,
  value: boolean,
): Promise<void> => {
  const update: DynamicDictionary = {};
  update["xid"] = XID;
  update[field] = value;
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
