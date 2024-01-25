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

  const tasks: Array<number> = [70, 55, 45, 40, 20, 10]
  const workers: Array<number> = [80, 70, 60, 20]
  const assignments: Array<[number, number]> = []

  console.log(devicePixelRatio, viewportHeight, viewportWidth, screenWidth, screenHeight)
  return (
    <div className="App">
      <EyeTracking />
      <div className="instructions-game-container-wrapper-outer">
        <div className="instructions-game-container-wrapper">
          <DevGAPWrapper />
        </div>{" "}
      </div>{" "}
    </div>
  );
}
