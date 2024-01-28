import React from "react";

interface CalibrationProps {
  onCalibrated: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onCalibrated }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);


  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const resize = () => {
      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resize, false);
    //resize() // should be small initially to allow interaction with other elements on screen

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        id="plotting_canvas"
        ref={canvasRef}
        style={{ cursor: 'crosshair' }}
      ></canvas>

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
      {/* Bootstrap stuff, menus, buttons
      <div id="helpModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <img src="media/example/calibration.png" width="100%" height="100%" alt="webgazer demo instructions"></img>
            </div>
            <div className="modal-footer">
              <button id="closeBtn" type="button" className="btn btn-default" data-bs-dismiss="modal">Close & load saved model </button>
              <button type="button" id='start_calibration' className="btn btn-primary" data-bs-dismiss="modal" onClick={() => Restart()}>Calibrate</button>
            </div>
          </div>
        </div>
      </div>
      <nav id="webgazerNavbar" className="navbar navbar-expand-lg navbar-default navbar-fixed-top">
      </nav>*/}
    </ >
  );
};

export default Calibration;
