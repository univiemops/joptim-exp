import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface DialogStartProps {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogStart: React.FC<DialogStartProps> = ({ showDialog, setShowDialog }) => {

  const handleClick = () => {
    setShowDialog(false)
  }

  return <Dialog
    open={showDialog}
    sx={{ zIndex: 10001 }}
  >
    <DialogTitle id="alert-dialog-title-start">
      Calibrating the Eye Tracker
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description-start"
        sx={{ userSelect: 'none' }}>
        To calibrate the eye tracking, turn on your webcam, place your head inside the square box and wait until it turns green. Then click on each red dot 5 times until it turns yellow.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClick()}>OK</Button>
    </DialogActions>
  </Dialog>;
}


interface DialogAccuracyBeforeProps {
  showDialog: boolean;
  onAccuracy: () => void;
}

export const DialogAccuracyBefore: React.FC<DialogAccuracyBeforeProps> = ({ showDialog, onAccuracy }) => {

  const handleClick = () => {
    onAccuracy();
  }

  return <Dialog
    open={showDialog}
    sx={{ zIndex: 10001 }}
  >
    <DialogTitle id="alert-dialog-title-train">
      Calculating measurement
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description-train"
        sx={{ userSelect: 'none' }}>
        Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClick()}>OK</Button>
    </DialogActions>
  </Dialog >
}


interface DialogAccuracyAfterProps {
  showDialog: boolean;
  accuracy: number | null;
  onRecalibrate: () => void;
  onCalibrated: () => void;
}

export const DialogAccuracyAfter: React.FC<DialogAccuracyAfterProps> = ({ showDialog, accuracy, onRecalibrate, onCalibrated }) => {

  return <Dialog
    open={showDialog}
    sx={{ zIndex: 10001 }}
  >
    <DialogTitle id="alert-dialog-title-pred">
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description-pred"
        sx={{ userSelect: 'none' }}>
        <span style={{ fontWeight: "bold", fontSize: "x-large" }}>Your accuracy measure is {accuracy}%</span>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onRecalibrate()}>Recalibrate</Button>
      <Button onClick={() => onCalibrated()}>OK</Button>
    </DialogActions>
  </Dialog >
}
