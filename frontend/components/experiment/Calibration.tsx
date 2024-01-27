import React from "react";

interface CalibrationProps {
  onCalibrated: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {

  React.useEffect(() => {
    console.log("useEffect in calibration")
  }, []);
  return (
    <div className="instructions">

      <canvas id="plotting_canvas" width="500" height="500" style={{ cursor: 'crosshair' }}></canvas>

      {/* Your other React components go here */}

      {/* Calibration points */}
      <div className="calibrationDiv">
        <input type="button" className="Calibration" id="Pt1"></input>
        <input type="button" className="Calibration" id="Pt2"></input>
        <input type="button" className="Calibration" id="Pt3"></input>
        <input type="button" className="Calibration" id="Pt4"></input>
        <input type="button" className="Calibration" id="Pt5"></input>
        <input type="button" className="Calibration" id="Pt6"></input>
        <input type="button" className="Calibration" id="Pt7"></input>
        <input type="button" className="Calibration" id="Pt8"></input>
        <input type="button" className="Calibration" id="Pt9"></input>
      </div>

      {/* Modal */}
      <div id="helpModal" className="modal fade" role="dialog">
        {/* Modal content goes here */}
      </div>

      {/* Navigation bar */}
      <nav id="webgazerNavbar" className="navbar navbar-expand-lg navbar-default navbar-fixed-top">
        {/* Navigation bar content goes here */}
      </nav>

      {/* Latest compiled JavaScript */}
      <script src="/js/resize_canvas.js"></script>
      <script src="/js/bootstrap/bootstrap.bundle.min.js"></script>
      <script>
        {/* Your other JavaScript code goes here */}
      </script>
    </div>
  );
};

export default Calibration;
