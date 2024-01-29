import React from "react";
import styles from "./calibration.module.css";
import { sumOfArray } from "@/utils/helperFunctions";

interface CalibrationProps {
  onCalibrated: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {
  const [calPointsClicked, setCalPointsClicked] = React.useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [showLastPoint, setShowLastPoint] = React.useState<boolean>(false)

  const calPointClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const point: number = Number((e.target as HTMLInputElement).value)
    const calPointsClickedNew = [...calPointsClicked]
    calPointsClickedNew[point - 1] += 1
    setCalPointsClicked(calPointsClickedNew);
    if (sumOfArray(calPointsClickedNew) == 40) {
      setShowLastPoint(true)
    }

    if (sumOfArray(calPointsClickedNew) == 45) {
      onCalibrated();
    }
  }

  React.useEffect(() => {
    console.log("calibration effect")
  }, []);

  return (
    <>
      <div className={styles.calibrationDiv} style={{ cursor: 'crosshair' }}>
        <span style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -50%)" }}>For calibrating the eyetracking please click each red point 5 times until it turns yellow.</span>
        {[1, 2, 3, 4, showLastPoint ? 5 : null, 6, 7, 8, 9].map((value, index) => (
          // Skip rendering if showLastPoint is false and index is 4 (5th point)
          (showLastPoint || index !== 4) ? (
            <input
              key={index}
              disabled={calPointsClicked[index] === 5 ? true : false}
              type="button"
              className={styles.Calibration}
              value={value === null ? "" : value.toString()}
              id={styles[`Pt${value}`]}
              onClick={(e) => calPointClick(e)}
              style={{
                opacity: 0.2 + calPointsClicked[index] * 0.20,
                backgroundColor: calPointsClicked[index] === 5 ? 'yellow' : 'red'
              }}
            />
          ) : null
        ))}
      </div>
    </>
  );
};

export default Calibration;
