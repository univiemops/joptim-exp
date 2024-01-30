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
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {
  const [calPointsClicked, setCalPointsClicked] = React.useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [showCenterPoint, setShowCenterPoint] = React.useState<boolean>(false)
  const [showCenterPointOnly, setShowCenterPointOnly] = React.useState<boolean>(false)
  const [showDialogAccuracyBefore, setShowDialogAccuracyBefore] = React.useState<boolean>(false)
  const [showDialogAccuracyAfter, setShowDialogAccuracyAfter] = React.useState<boolean>(false)
  const [precision, setPrecision] = React.useState<number | null>(null)


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
    setPrecision(precision_measurement);
    setShowDialogAccuracyAfter(true)
  };


  const onRecalibrate = () => {
    const webgazer = window.webgazer
    webgazer.clearData();
    setShowCenterPoint(false)
    setShowCenterPointOnly(false)
    setShowDialogAccuracyAfter(false)
    setCalPointsClicked([0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  React.useEffect(() => {
    console.log("calibration effect")
  }, []);

  return (
    <>
      <canvas id="plotting_canvas" style={{ position: "fixed", width: "100vw", height: "100vh" }}></canvas>
      <div className={styles.calibrationDiv} style={{ cursor: 'crosshair' }}>
        <Dialog
          open={showDialogAccuracyBefore}
          sx={{ zIndex: 10001 }}
        >
          <DialogTitle id="alert-dialog-title">
            Calculating measurement
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
          <DialogTitle id="alert-dialog-title">
            Calculating measurement
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span style={{ fontWeight: "bold", fontSize: "x-large" }}>Your accuracy measure is {precision}%</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onRecalibrate()}>Recalibrate</Button>
            <Button onClick={() => onCalibrated()}>OK</Button>
          </DialogActions>
        </Dialog >
        {
          !showCenterPointOnly && <span style={{ position: "absolute", top: "36%", left: "50%", transform: "translate(-50%, -50%)" }}>
            For calibrating the eyetracking please click each red point 5 times until it turns yellow.
          </span>
        }
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
