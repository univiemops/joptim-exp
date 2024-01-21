import React from "react";

export default function Instructions() {
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
      //style={{ transform: `scale(${scale})` }}
    >
      <div
        id="dev-container"
        style={{
          width: "var(--box-size)",
          height: "var(--box-size)",
          backgroundColor: "gray",
        }}
      >
        <p>--box-size: {boxSize}</p>
        <p>devicePixelRatio: {devicePixelRatio}</p>
        <p>
          viewport: {viewportWidth} x {viewportHeight}
        </p>
        <p>
          screen: {screenWidth} x {screenHeight}
        </p>

        <p>
          --box-size based on media query:
          <div style={{ fontSize: "10px" }}>
            <p>base: 240px</p>
            <p>min-height: 400px: 350px</p>
            <p>min-width: 600px and min-height: 600px: 750px</p>
            <p>min-height: 900px: 550px</p>
            <p>min-height: 1200px: 600px</p>
            <p>min-height: 1800px: 600px</p>
            <p>min-height: 2000px: 900px</p>
          </div>
        </p>
      </div>
    </div>
  );
}
