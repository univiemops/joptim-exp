window.onload = async function () {

  // Start the webgazer tracker
  await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
    .setTracker('TFFacemesh')
    .setGazeListener(function (data, clock) {
      //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    })
    .saveDataAcrossSessions(true)
    .begin();
  webgazer.showVideoPreview(true) /* shows all video previews */
    .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
    .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

  // Set up the webgazer video feedback.
  var setup = function () {

    // Set up the main canvas. The main canvas is used to calibrate the webgazer.
    var canvas = document.getElementById("plotting_canvas") as HTMLCanvasElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
    }
  };
  setup();

};

// Set to true if you want to save the data even if you reload the page.
(window as any).saveDataAcrossSessions = true;

window.onbeforeunload = function () {
  webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and resetting the calibration point
 */
function Restart() {
  var accuracyElement = document.getElementById("Accuracy");
  if (accuracyElement) {
    accuracyElement.innerHTML = "<a>Not yet Calibrated</a>";
  }
  webgazer.clearData();
  ClearCalibration();
  PopUpInstruction();
}

