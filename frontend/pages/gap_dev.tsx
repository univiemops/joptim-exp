import React from "react";
import DevGAPWrapper from "../components/GAP/DevGAPWrapper";
import EyeTracking from "../eyetracking/EyeTracking"; // remove this if you do not need eyetracking
import Calibration from "../eyetracking/Calibration"; // remove this if you do not need eyetracking

export default function Dev() {
  const [choice, setChoice] = React.useState<number>(0);
  const progress = 30;

  const handleClick = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setChoice(index);
    alert(`We're glad you like Solution ${index}, but this is not the real world, just a test screen to test eye tracking.`)
  };

  // remove this block if you do not need eyetracking
  const [calibrated, setCalibrated] = React.useState<boolean>(false);
  const handleCalibrated = () => {
    setCalibrated(true);
  };


  return (
    <div className="App">
      <EyeTracking calibrated={calibrated} /> {/* remove this if you do not need eyetracking */}
      {calibrated ? ( // remove this conditional if you do not need eyetracking
        <>
          <div className="trial-instruction">
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
        </>
      ) : (
        <Calibration onCalibrated={handleCalibrated} /> /*remove this if you do not need eyetracking */
      )}
    </div>
  );
}
