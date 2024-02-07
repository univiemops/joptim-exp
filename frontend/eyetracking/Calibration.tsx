import React from "react";
import styles from "./calibration.module.css";
import { sumOfArray } from "@/utils/helperFunctions";
import { calculatePrecision } from "./precision_calculation";
import {
  DialogStart,
  DialogAccuracyBefore,
  DialogAccuracyAfter,
} from "./CalibrationDialogs";

interface CalibrationProps {
  onCalibrated: () => void;
  setAccuracy: (accuracy: number | null) => void;
  accuracy: number | null;
}

const Calibration: React.FC<CalibrationProps> = ({
  onCalibrated,
  setAccuracy,
  accuracy,
}) => {
  const [calPointsClicked, setCalPointsClicked] = React.useState<Array<number>>(
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  );
  const [showCenterPoint, setShowCenterPoint] = React.useState<boolean>(false);
  const [showCenterPointOnly, setShowCenterPointOnly] =
    React.useState<boolean>(false);
  const [showDialogStart, setShowDialogStart] = React.useState<boolean>(true);
  const [showDialogAccuracyBefore, setShowDialogAccuracyBefore] =
    React.useState<boolean>(false);
  const [showDialogAccuracyAfter, setShowDialogAccuracyAfter] =
    React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    if (!showDialogStart && !document.fullscreenElement) {
      // the request for webcam access leaves
      // fullscreen (FS) mode. this hook gets back
      // to FS mode after you click OK
      // in the first dialog. Delete this block if you
      // do not need FS mode.
      try {
        document.documentElement.requestFullscreen();
      } catch (error) {
        console.error("Error requesting fullscreen:", error);
      }
    }
  });

  const calPointClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const point: number = Number((e.target as HTMLInputElement).value);
    const calPointsClickedNew = [...calPointsClicked];
    calPointsClickedNew[point - 1] += 1;
    setCalPointsClicked(calPointsClickedNew);
    if (sumOfArray(calPointsClickedNew) == 40) {
      setShowCenterPoint(true);
    }

    if (sumOfArray(calPointsClickedNew) == 45) {
      setShowCenterPointOnly(true);
      setShowDialogAccuracyBefore(true);
    }
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onAccuracy = async () => {
    setShowDialogAccuracyBefore(false);
    const webgazer = window.webgazer;
    webgazer.params.storingPoints = true;

    await sleep(5000);

    webgazer.params.storingPoints = false;
    const past50 = webgazer.getStoredPoints();
    const precision_measurement = calculatePrecision(past50);
    setAccuracy(precision_measurement);
    setShowDialogAccuracyAfter(true);
  };

  const onRecalibrate = () => {
    clearCanvas();
    const webgazer = window.webgazer;
    webgazer.clearData();
    setShowCenterPoint(false);
    setShowCenterPointOnly(false);
    setShowDialogAccuracyAfter(false);
    setCalPointsClicked([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const clearCanvas = () => {
    const canvas = document.getElementById(
      "plotting_canvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const setupCanvas = () => {
    const canvas = document.getElementById(
      "plotting_canvas",
    ) as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
  };


  React.useEffect(() => {
    setupCanvas();
  }, []);

  return (
    <>
      <canvas
        id="plotting_canvas"
        style={{ position: "fixed", width: "100vw", height: "100vh" }}
      ></canvas>
      <div className={styles.calibrationDiv} style={{ cursor: "crosshair" }}>
        <DialogStart
          showDialog={showDialogStart}
          setShowDialog={setShowDialogStart}
        />
        <DialogAccuracyBefore
          showDialog={showDialogAccuracyBefore}
          onAccuracy={onAccuracy}
        />
        <DialogAccuracyAfter
          showDialog={showDialogAccuracyAfter}
          accuracy={accuracy}
          onRecalibrate={onRecalibrate}
          onCalibrated={onCalibrated}
        />
        {Array.from({ length: 9 }).map((_, index: number) =>
          (showCenterPoint || index !== 4) &&
            (!showCenterPointOnly || index === 4) ? (
            <input
              key={index}
              disabled={calPointsClicked[index] === 5 ? true : false}
              type="button"
              className={styles.Calibration}
              value={index + 1 === null ? "" : (index + 1).toString()}
              id={styles[`Pt${index + 1}`]}
              onClick={(e) => calPointClick(e)}
              style={{
                opacity: 0.2 + calPointsClicked[index] * 0.2,
                backgroundColor:
                  calPointsClicked[index] === 5 ? "yellow" : "red",
                cursor: calPointsClicked[index] === 5 ? "crosshair" : "pointer",
              }}
            />
          ) : null,
        )}
      </div>
    </>
  );
};

export default Calibration;
