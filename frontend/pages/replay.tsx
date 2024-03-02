import React from "react";
import Head from 'next/head'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UserDataProps } from "@/components/experiment/types";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const ReplayPage = () => {
  const [XID, setXID] = React.useState("");
  const [participants, setParticipants] = React.useState<UserDataProps[]>([]);

  let loadedPlayer = 0;


  function checkBooleanFields(fields: UserDataProps): string {
    const entries = Object.entries(fields);

    let allCompleted = true;
    let lastCompletedKey = "";
    let nothingCompleted = true;

    for (const [key, value] of entries) {
      if (value) {
        lastCompletedKey = key;
        nothingCompleted = false;
      } else {
        allCompleted = false;
      }
    }

    if (allCompleted) {
      return "all completed";
    } else if (!nothingCompleted) {
      if (lastCompletedKey === "xid") { return "nothing completed" } else {
        return `${lastCompletedKey} completed`;
      }
    } else {
      return "nothing completed";
    }
  }

  React.useEffect(() => {
    const loadParticipants = async () => {
      try {
        const res = await fetch(`${OPTIONAL_SUBURI}/users`);
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const json = await res.json();
        setParticipants(json)
      } catch (error) {
        console.error(error);
      }
    };
    loadParticipants();
  }, [])

  let replayer: any;

  React.useEffect(() => {
    console.log("removing element div.rr-player element")
    document.querySelectorAll("div.rr-player").forEach(el => el.remove());
    if (window && XID !== "" && replayer === undefined && loadedPlayer === 0) {
      loadedPlayer++;
      const loadEvents = async () => {
        try {
          const res = await fetch(`${OPTIONAL_SUBURI}/rrweb/${XID}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          const events = await res.json();
          console.log("rrweb: loaded", events.length, "events");
          replayer = new window.rrwebPlayer({
            target: document.getElementById("fixed-player-container"),
            props: {
              events: events,
              showController: true,
              maxWidth: "100%",
              maxHeight: "100%",
            },
          });
          await replayer.getMetaData(); // wait til it's loaded
          replayer.play();
        } catch (error) {
          console.error(error);
        }
      };
      loadEvents();
    }
    return () => {
      if (replayer) {
        replayer.pause();
        replayer = null;
        const element = document.getElementById("fixed-player-container");

        if (element) {
          element.innerHTML = "";
        }
      }
    };
  }, [XID]);

  const handleChange = (event: SelectChangeEvent) => {
    setXID(event.target.value as string);
  };

  return (
    <div style={{ display: "block", textAlign: "left" }}>
      <Head>
        <title>Replay</title>
      </Head>
      <FormControl style={{ minWidth: "250px" }}>
        <Select
          value={XID}
          onChange={handleChange}
        >{participants.map((item, key) => <MenuItem key={key} value={String(item.pid)}>{item.pid} ({checkBooleanFields(item)})</MenuItem>)}
        </Select>
      </FormControl>
      <div id="fixed-player-container"></div>
    </div>
  );
};

export default ReplayPage;
