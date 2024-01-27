import React from "react";

interface CalibrationProps {
  onCalibrated: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {

  React.useEffect(() => {
    console.log("useEffect in calibration")
  }, []);
  return (
    <div>
      Calibration Page
    </div>
  );
};

export default Calibration;
