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
  const [countdown, setCountdown] = React.useState(5);

  const handleClick = () => {
    setShowDialog(false)
  }

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showDialog) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    } else { setCountdown(5) }

    return () => {
      clearInterval(timer);
    };
  }, [showDialog]);

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
        To calibrate the eye tracking, turn on your webcam, place your head inside the square box and wait until it turns green. Then click on each red dot 5 times until it turns yellow. {countdown > 0 ? `Wait ${countdown}s.` : null}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClick()} disabled={countdown > 0}>OK</Button>
    </DialogActions>
  </Dialog>;
}


interface DialogAccuracyBeforeProps {
  showDialog: boolean;
  onAccuracy: () => void;
}

export const DialogAccuracyBefore: React.FC<DialogAccuracyBeforeProps> = ({ showDialog, onAccuracy }) => {
  const [countdown, setCountdown] = React.useState(5);

  const handleClick = () => {
    onAccuracy();
  }

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showDialog) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    } else { setCountdown(5) }

    return () => {
      clearInterval(timer);
    };
  }, [showDialog]);

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
        Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions. {countdown > 0 ? `Wait ${countdown}s.` : null}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClick()} disabled={countdown > 0}>OK</Button>
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
  const [countdown, setCountdown] = React.useState(5);



  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showDialog) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    } else { setCountdown(5) }

    return () => {
      clearInterval(timer);
    };
  }, [showDialog]);

  return <Dialog
    open={showDialog}
    sx={{ zIndex: 10001 }}
  >
    <DialogTitle id="alert-dialog-title-pred">
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description-pred"
        sx={{ userSelect: 'none' }}>
        <p style={{ fontWeight: "bold", fontSize: "x-large" }}>
          Your accuracy measure is {accuracy}%.
        </p>
        <p>Click "OK" if you want to proceed to the experiment, click "Recalibrate" if you want to try again. {countdown > 0 ? `Wait ${countdown}s` : null}</p>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onRecalibrate()} disabled={countdown > 0}>Recalibrate</Button>
      <Button onClick={() => onCalibrated()} disabled={countdown > 0}>OK</Button>
    </DialogActions>
  </Dialog >
}
