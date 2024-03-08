import React, { useEffect } from "react";
import Head from 'next/head'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
        const res = await fetch(`${OPTIONAL_SUBURI}/tables/user`);
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



  // const calcuateReplayerSize = () => {
  //   const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
  //   const marginInPixels = 2 * remInPixels;
  //   const newWidth = window.innerWidth - marginInPixels;
  //   const newHeight = window.innerHeight - marginInPixels;
  //   return { newWidth, newHeight }
  // }

  interface ResizeConfig {
    width: number;
    height: number;
  }

  const calculateReplayerSize = (): ResizeConfig => {
    const maxWidth = 1024;
    const aspectRatio = 3 / 2;
    const dropdownHeight = 56 // TODO: query this
    const replayMenuHeight = 80 // TODO: query this
    const maxHeight = 1024 / aspectRatio;

    const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const marginInPixels = 2 * remInPixels;

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // based on width
    const width1: number = currentWidth;
    // based on height
    const width2: number = currentHeight * aspectRatio;

    let width: number = width1 - marginInPixels
    let height: number

    // choose the smaller height
    if (width1 > width2) {
      height = (width2) / aspectRatio
    } else {
      height = (width1) / aspectRatio
    }

    // Check if the width exceeds the maximum allowed width
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    // Check if the height exceeds the maximum allowed height
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    if (currentHeight < height) {
      height = currentHeight
    }
    height = height - 1.5 * marginInPixels - dropdownHeight - replayMenuHeight
    console.log("width", width, "height", height)
    return {
      width,
      height,
    };
  };

  const handleResize = () => {
    const { width: newWidth, height: newHeight } = calculateReplayerSize()
    replayer.$set({
      width: newWidth,
      height: newHeight,
    });
  }

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
          const { width: newWidth, height: newHeight } = calculateReplayerSize()
          replayer = new window.rrwebPlayer({
            target: document.getElementById("fixed-player-container"),
            props: {
              events: events,
              showController: true,
              width: newWidth,
              height: newHeight,
            },
          });

          await replayer.getMetaData(); // wait til it's loaded
          window.addEventListener("resize", handleResize);
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
        window.removeEventListener("resize", handleResize);
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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100vw", height: "100vh", padding: "1rem" }}>
      <Head>
        <title>Replay</title>
      </Head>
      <FormControl >
        <InputLabel id="demo-simple-select-helper-label">PID</InputLabel>
        <Select
          label="PID"
          variant={"outlined"}
          sx={{ maxWidth: "calc(100vw - 2rem)", width: "1024px" }}
          autoWidth={false}
          value={XID}
          onChange={handleChange}
        >{participants.map((item, key) => <MenuItem key={key} value={String(item.pid)}>
          <div id="participant-to-select" style={{ display: "flex", justifyContent: "space-between", width: "100%" }} >
            <span >{item.pid}</span>
            <span style={{ color: "gray" }}> {checkBooleanFields(item)}</span>
          </div>
        </MenuItem>)}
        </Select>
      </FormControl>
      <div id="fixed-player-container" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", maxWidth: "calc(100vw - 2rem)", width: "100vw", height: "100vh", padding: "1rem" }}>
      </div>
    </div>
  );
};

export default ReplayPage;
