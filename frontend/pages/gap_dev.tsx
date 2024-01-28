import React from "react";
import DevGAPWrapper from "../components/GAP/DevGAPWrapper"
import EyeTracking from '../components/eyetracking/EyeTracking';
import { useScript } from '../utils/useScript'
import Calibration from "../components/eyetracking/Calibration"


export default function Dev() {
  const [choice, setChoice] = React.useState<number>(0);
  const progress = 30

  const handleClick = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setChoice(index);
  };

  // move this into a context incl all the eyetracking states (calibrated, data)
  const [calibrated, setCalibrated] = React.useState<boolean>(false)
  const webgazerScript = "webgazer.js"
  const status = useScript(webgazerScript, {
    removeOnUnmount: false,
  })

  const handleCalibrated = () => {
    setCalibrated(true)
  }

  return (
    <div className="App">
      {/*<EyeTracking status={status} calibrated={calibrated} />*/}
      {calibrated ?
        <><div className="trial-instruction">
          <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
            Which of the two solutions do you prefer?
          </span>
          <div
            id="progress-bar"
            style={{
              display: "flex",
              minWidth: "100%",
              minHeight: ".5rem",
              backgroundColor: "#efefef",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              id="progress-bar-inner"
              style={{
                minHeight: "100%",
                backgroundColor: "steelblue",
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

          <div
            className="stimulus-pair-container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <div
              onClick={(e) => handleClick(e, 1)}
              style={
                choice === 1
                  ? {
                    border: "5px solid lightgreen",
                  }
                  : {
                    border: "5px solid #efefef",
                  }
              }
            >

              <DevGAPWrapper />
            </div>
            <div

              onClick={(e) => handleClick(e, 2)}
              style={
                choice === 2
                  ? {
                    border: "5px solid lightgreen",
                  }
                  : {
                    border: "5px solid #efefef",
                  }
              }
            >

              <DevGAPWrapper />
            </div>
          </div>
        </> : <Calibration onCalibrated={handleCalibrated} />}
    </div>
  );
}
