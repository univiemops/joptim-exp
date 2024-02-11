import React from "react";
import { useScript } from "./useScript";
import { GazeData } from "./types";

const OPTIONAL_SUBURI: string =
  process.env.NEXT_PUBLIC_API_URL?.toString() ?? "no-valid-url";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const webgazerScript = `${basePath}/webgazer/webgazer.js`;

interface EyeTrackingProps {
  xid: string;
  calibrated: boolean;
  onFail?: () => void;
}

const EyeTracking: React.FC<EyeTrackingProps> = ({
  xid,
  calibrated,
  onFail,
}) => {
  const [webgazer, setWebgazer] = React.useState<Webgazer | undefined>();
  const status = useScript(webgazerScript, {
    removeOnUnmount: false,
  });

  // // websocket stuff begin (remove if not needed)
  const [socket, setSocket] = React.useState<any>(null);
  const [hostname, setHostname] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.origin);
    }
  }, []);

  React.useEffect(() => {
    if (hostname !== "") {
      let base_url = "";
      if (/https?:\/\//.test(OPTIONAL_SUBURI)) {
        base_url = OPTIONAL_SUBURI;
      } else {
        base_url = `${hostname}${OPTIONAL_SUBURI}`;
      }

      base_url = `${base_url.replace(/^https?:\/\//, (match) =>
        match === "http://" ? "ws://" : "wss://",
      )}`;
      console.log("base_url", base_url);
      const newSocket = new WebSocket(`${base_url}/eyetracking`);
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, [hostname]);

  // let openConnections: number = 0; // to make sure only 1 connection is opened
  // React.useEffect(() => {
  //   openConnections++;
  //   if (!ws && openConnections === 1) {
  //     const newWs = new WebSocket(WS_URL);
  //     setWs(newWs);
  //     return () => {
  //       if (newWs.readyState === WebSocket.OPEN) {
  //         openConnections = 0;
  //         newWs.close();
  //       }
  //     };
  //   }
  // }, []);

  const sendDataToBackend = (data: GazeData) => {
    if (socket) {
      socket.send(JSON.stringify(data));
    }
  };
  // // websocket stuff end

  React.useEffect(() => {
    if (window) {
      if (!webgazer) {
        setWebgazer(window.webgazer);
      }
      if (webgazer) {
        if (!calibrated) {
          console.log("starting webgazer calibration");
          webgazer
            .clearData()
          webgazer
            .setRegression("ridge")
            .showFaceOverlay(true)
            .saveDataAcrossSessions(true)
            .begin(onFail)

        } else if (calibrated) {
          console.log("starting webgazer data collection");
          let timestamp = Date.now()
          webgazer
            .showPredictionPoints(true)
            .showVideo(true)
            .setGazeListener((data: any) => {
              if (data && data.x !== null && data.y !== null) {
                const viewportWidth =
                  window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth;
                const viewportHeight =
                  window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight;
                const gazeData: GazeData = {
                  xid: xid,
                  timestamp: Date.now(),
                  x: data.x.toFixed(4),
                  y: data.y.toFixed(4),
                  viewport: `${viewportWidth}x${viewportHeight}`,
                };
                // Begin: for hiding video if eyes are inside the box
                let switcher = 1
                const feedbackBox = document.getElementById("webgazerFaceFeedbackBox")
                const videoFeed = document.getElementById("webgazerVideoFeed")
                const overlay = document.getElementById("webgazerFaceOverlay")
                if (feedbackBox !== null && videoFeed != null && overlay != null) {
                  if (feedbackBox.style.border === "solid green" && Date.now() - timestamp > 2000) {
                    videoFeed.style.width = "1px"
                    videoFeed.style.height = "1px"
                    overlay.style.width = "1px"
                    overlay.style.height = "1px"
                    feedbackBox.style.display = "none"
                    if (switcher == 0) {
                      timestamp = Date.now()
                      switcher = 1
                    }
                  } else if (Date.now() - timestamp > 2000) {
                    videoFeed.style.width = "320px"
                    videoFeed.style.height = "240px"
                    overlay.style.width = "320px"
                    overlay.style.height = "240px"
                    feedbackBox.style.display = "block"
                    if (switcher == 1) {
                      timestamp = Date.now()
                      switcher = 0
                    }
                  }
                }
                // End: for hiding video if eyes are inside the box
                sendDataToBackend(gazeData); // websocket stuff: replace if not needed, e.g. w/ console.log(gazeData)
              }
            })
            .begin()
        }
        return () => {
          if (webgazer) {
            console.log("ended webgazer")
            webgazer.end();
          }
        };
      }
    }
  }, [calibrated, status, webgazer]);

  return <div style={{ display: "none" }}></div>;
};

export default EyeTracking;
