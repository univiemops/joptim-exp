import React from "react";
import { TextField } from "@mui/material";

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const ReplayPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [XID, setXID] = React.useState("");

  const handleKeyPress = (e: any) => {
    if (e.code === "Enter") {
      console.log(e.target.value);
      setXID(e.target.value);
    }
  };

  React.useEffect(() => {
    console.log("ran through useEffect");
    if (window && XID !== "") {
      setLoading(true);
      const loadEvents = async () => {
        try {
          const res = await fetch(`${OPTIONAL_SUBURI}/rrweb/${XID}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          const events = await res.json();
          setLoading(false);
          console.log("rrweb: loaded", events.length, "events");
          const replayer = new window.rrweb.Replayer(events);
          replayer.play();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      loadEvents();
    }
  }, [XID]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "space-between",
      }}
    >
      <TextField
        size="small"
        placeholder="XID or PID to replay"
        variant="outlined"
        defaultValue={""}
        onKeyUp={(e) => handleKeyPress(e)}
        autoFocus
        sx={{ width: "300px" }}
      ></TextField>
      {loading ? <p>Loading events...</p> : null}
    </div>
  );
};

export default ReplayPage;
