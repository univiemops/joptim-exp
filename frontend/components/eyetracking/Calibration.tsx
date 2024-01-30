import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from "./calibration.module.css";
import { sumOfArray } from "@/utils/helperFunctions";

interface CalibrationProps {
  onCalibrated: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {
  const [calPointsClicked, setCalPointsClicked] = React.useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [showCenterPoint, setShowCenterPoint] = React.useState<boolean>(false)
  const [showCenterPointOnly, setShowCenterPointOnly] = React.useState<boolean>(false)
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

  React.useEffect(() => {
    console.log("calibration effect")
  }, []);

  const accuracy: number = 100

  return (
    <>
      <div className={styles.calibrationDiv} style={{ cursor: 'crosshair' }}>

        <Dialog
          open={showDialogAccuracyBefore}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
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
            <Button onClick={() => setShowDialogAccuracyBefore(false)}>OK</Button>
          </DialogActions>
        </Dialog >
        <Dialog
          open={showDialogAccuracyAfter}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ zIndex: 10001 }}
        >
          <DialogTitle id="alert-dialog-title">
            Calculating measurement
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h2>Your accuracy measure is {accuracy}%</h2>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialogAccuracyAfter(false)}>Recalibrate</Button>
            <Button onClick={() => setShowDialogAccuracyAfter(false)}>OK</Button>
          </DialogActions>
        </Dialog >
        {
          !showCenterPointOnly && <span style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -50%)" }}>
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


