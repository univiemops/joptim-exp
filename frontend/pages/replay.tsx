import React from "react";
import Head from 'next/head'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const ReplayPage = () => {
  const [XID, setXID] = React.useState("");
  const [PIDs, setPIDs] = React.useState([]);

  let loadedPlayer = 0;

  React.useEffect(() => {
    const loadPIDs = async () => {
      try {
        const res = await fetch(`${OPTIONAL_SUBURI}/users`);
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const json = await res.json();
        const fetchedPIDs = json.map((item: any) => item.pid);
        console.log(fetchedPIDs)
        setPIDs(fetchedPIDs)
      } catch (error) {
        console.error(error);
      }
    };
    loadPIDs();
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
        >{PIDs.map((item, key) => <MenuItem key={key} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
      <div id="fixed-player-container"></div>
    </div>
  );
};

export default ReplayPage;
