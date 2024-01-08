const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

export const handleSubmit1 = async (
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

export const handleSubmit2 = async (
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
