import React from "react";
import { TextField } from "@mui/material";
import Head from 'next/head'

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const ReplayPage = () => {
  const [XID, setXID] = React.useState("");

  let loadedPlayer = 0;

  const handleKeyPress = (e: any) => {
    if (e.code === "Enter") {
      loadedPlayer = 0;
      setXID(e.target.value);
    }
  };

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
          // Clear the content of the element
          element.innerHTML = "";
        }
      }
    };
  }, [XID]);

  return (
    <div style={{ display: "block", textAlign: "left" }}>
      <Head>
        <title>Replay</title>
      </Head>
      <TextField
        size="small"
        placeholder="Enter XID or PID"
        variant="outlined"
        defaultValue={""}
        onKeyUp={(e) => handleKeyPress(e)}
        autoFocus
        sx={{ width: "300px" }}
      ></TextField>
      <div id="fixed-player-container"></div>
    </div>
  );
};

export default ReplayPage;
