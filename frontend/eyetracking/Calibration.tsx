import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from "./calibration.module.css";
import { sumOfArray } from "@/utils/helperFunctions";
import { calculatePrecision } from "./precision_calculation"

interface CalibrationProps {
  onCalibrated: () => void;
  setAccuracy: (accuracy: number | null) => void;
  accuracy: number | null
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated, setAccuracy, accuracy }) => {
  const [calPointsClicked, setCalPointsClicked] = React.useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [showCenterPoint, setShowCenterPoint] = React.useState<boolean>(false)
  const [showCenterPointOnly, setShowCenterPointOnly] = React.useState<boolean>(false)
  const [showDialogStart, setShowDialogStart] = React.useState<boolean>(true)
  const [showDialogAccuracyBefore, setShowDialogAccuracyBefore] = React.useState<boolean>(false)
  const [showDialogAccuracyAfter, setShowDialogAccuracyAfter] = React.useState<boolean>(false)


  const calPointClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const point: number = Number((e.target as HTMLInputElement).value)
    const calPointsClickedNew = [...calPointsClicked]
    calPointsClickedNew[point - 1] += 1
    setCalPointsClicked(calPointsClickedNew);
    if (sumOfArray(calPointsClickedNew) == 40) {
      setShowCenterPoint(true)
    }

    if (sumOfArray(calPointsClickedNew) == 45) {
      setShowCenterPointOnly(true)
      setShowDialogAccuracyBefore(true)
    }
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onAccuracy = async () => {
    setShowDialogAccuracyBefore(false);
    const webgazer = window.webgazer;
    webgazer.params.storingPoints = true;

    await sleep(5000);

    webgazer.params.storingPoints = false;
    const past50 = webgazer.getStoredPoints();
    const precision_measurement = calculatePrecision(past50);
    setAccuracy(precision_measurement);
    setShowDialogAccuracyAfter(true)
  };


  const onRecalibrate = () => {
    clearCanvas()
    const webgazer = window.webgazer
    webgazer.clearData();
    setShowCenterPoint(false)
    setShowCenterPointOnly(false)
    setShowDialogAccuracyAfter(false)
    setCalPointsClicked([0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  const clearCanvas = () => {
    const canvas = document.getElementById('plotting_canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const setupCanvas = () => {
    const canvas = document.getElementById('plotting_canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
  };

  React.useEffect(() => {
    setupCanvas();
  }, []);

  return (
    <>
      <canvas id="plotting_canvas" style={{ position: "fixed", width: "100vw", height: "100vh" }}></canvas>
      <div className={styles.calibrationDiv} style={{ cursor: 'crosshair' }}>
        <Dialog
          open={showDialogStart}
          sx={{ zIndex: 10001 }}
        >
          <DialogTitle id="alert-dialog-title-start">
            Calibrating the Eye Tracker
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-start">
              To calibrate the eye tracking, turn on your webcam, place your head inside the square box and wait until it turns green. Then click on each red dot 5 times until it turns yellow.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialogStart(false)}>OK</Button>
          </DialogActions>
        </Dialog >
        <Dialog
          open={showDialogAccuracyBefore}
          sx={{ zIndex: 10001 }}
        >
          <DialogTitle id="alert-dialog-title-train">
            Calculating measurement
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-train">
              Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onAccuracy}>OK</Button>
          </DialogActions>
        </Dialog >
        <Dialog
          open={showDialogAccuracyAfter}
          sx={{ zIndex: 10001 }}
        >
          <DialogTitle id="alert-dialog-title-pred">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-pred">
              <span style={{ fontWeight: "bold", fontSize: "x-large" }}>Your accuracy measure is {accuracy}%</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onRecalibrate()}>Recalibrate</Button>
            <Button onClick={() => onCalibrated()}>OK</Button>
          </DialogActions>
        </Dialog >
        {
          Array.from({ length: 9 }).map((_, index: number) => (
            ((showCenterPoint || index !== 4) && (!showCenterPointOnly || index === 4)) ? (
              <input
                key={index}
                disabled={calPointsClicked[index] === 5 ? true : false}
                type="button"
                className={styles.Calibration}
                value={index + 1 === null ? "" : (index + 1).toString()}
                id={styles[`Pt${index + 1}`]}
                onClick={(e) => calPointClick(e)}
                style={{
                  opacity: 0.2 + calPointsClicked[index] * 0.20,
                  backgroundColor: calPointsClicked[index] === 5 ? 'yellow' : 'red',
                  cursor: calPointsClicked[index] === 5 ? 'crosshair' : 'pointer'
                }}
              />
            ) : null
          ))
        }
      </div >
    </>
  );
};

export default Calibration;
