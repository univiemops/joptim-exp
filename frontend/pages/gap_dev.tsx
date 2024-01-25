import React from "react";
import DevGAPWrapper from "../components/GAP/DevGAPWrapper"
import EyeTracking from '../components/webgazer/EyeTracking';

export default function Dev() {
  const [boxSize, setBoxSize] = React.useState("");
  const [devicePixelRatio, setDevicePixelRatio] = React.useState(1);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [screenHeight, setScreenHeight] = React.useState(0);
  React.useEffect(() => {
    if (window !== undefined) {
      setDevicePixelRatio(window.devicePixelRatio);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setScreenHeight(window.screen.height);
      setScreenWidth(window.screen.width);
    }
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const boxSize_ = style.getPropertyValue("--box-size");
    setBoxSize(boxSize_);

    console.log("boxSize", boxSize_)
  }, []);

  const [choice, setChoice] = React.useState<number>(0);
  const tasks: Array<number> = [70, 55, 45, 40, 20, 10]
  const workers: Array<number> = [80, 70, 60, 20]
  const assignments: Array<[number, number]> = []
  const progress = 30
  console.log(devicePixelRatio, viewportHeight, viewportWidth, screenWidth, screenHeight)


  const handleClick = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setChoice(index);
  };

  return (
    <div className="App">
      <EyeTracking />
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

    </div>
  );
}
