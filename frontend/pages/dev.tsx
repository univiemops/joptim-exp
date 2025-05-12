import React from "react";

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
  }, []);

  return (
    <div
      id="default-app-container"
      className="App"
    >
      <div
        id="dev-container"
        style={{
          width: "var(--box-size)",
          height: "var(--box-size)",
          backgroundColor: "gray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p>--box-size: {boxSize}</p>
        <p>devicePixelRatio: {devicePixelRatio.toFixed(2)}</p>
        <p>
          viewport: {viewportWidth} x {viewportHeight}
        </p>
        <p>
          screen: {screenWidth} x {screenHeight}
        </p>
      </div>
    </div>
  );
}
