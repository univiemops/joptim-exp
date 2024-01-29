import React, { useEffect } from 'react';
import Script from 'next/script'


const webgazerScript = "webgazer.js"

interface EyeTrackingProps {
  calibrated: boolean;
}


const EyeTracking: React.FC<EyeTrackingProps> = ({ calibrated }) => {
  const [webgazer, setWebgazer] = React.useState<Webgazer | undefined>()
  const [scriptLoaded, setScriptLoaded] = React.useState<boolean>(false)

  // const modifyElementStyle = () => {
  //   var wB = document.getElementById("webgazerGazeDot");
  //   if (wB) {
  //     wB.style.background = "transparent";
  //     wB.style.width = "90px";
  //     wB.style.height = "90px";
  //     wB.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.15)";
  //     wB.style.zIndex = "0";
  //   } else {
  //     console.warn("Element with ID 'webgazerGazeDot' not found. Retrying...");
  //     setTimeout(modifyElementStyle, 100);
  //   }
  // };

  //useEffect(() => {
  //  modifyElementStyle();
  //}, []); // Empty dependency array ensures that this effect runs once after the component mounts


  useEffect(() => {
    if (window) {

      if (!webgazer) {
        setWebgazer(window.webgazer)
        console.log("set webgazer")
      }
      if (webgazer && !calibrated) {

        console.log("start webgazer calibration")
        // webgazer.setRegression("weightedRidge")  // ridge, weightedRidge, threadedRidge
        //   .setTracker("TFFacemesh")
        //   .saveDataAcrossSessions(true)
        //   .applyKalmanFilter(true)
        //   .begin()


        // from calibration main.js
        webgazer.setRegression('ridge') /* currently must set regression and tracker */
          //.setTracker('clmtrackr')
          .setGazeListener(function (data, clock) {
          })
          .saveDataAcrossSessions(true)
          .begin();

        webgazer.showVideoPreview(true) /* shows all video previews */
          .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
          .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */


        //webgazer.params.videoViewerWidth = 240;
        //webgazer.params.videoViewerHeight = 180;

      }
      if (webgazer && calibrated) {

        console.log("finished webgazer calibration, starting data collection")
        webgazer.showPredictionPoints(true)
          .saveDataAcrossSessions(true)
          //.showVideo(false)
          //webgazer.showFaceFeedbackBox(false)
          .setGazeListener((data: any, elapsedTime: any) => {
            if (data && data.x !== null && data.y !== null) {
              // console.log(`Gaze data: t=${elapsedTime / 1000}, x=${data.x.toFixed(4)}, y=${data.y.toFixed(4)}`);
            }
          });
      }

      // return () => {
      //  webgazer.end();
      // };
    }
  }, [calibrated, scriptLoaded]);

  //return <div></div>
  return <div style={{ display: 'none' }}>
    <Script
      id="webgazerScript"
      src={webgazerScript}
      onError={(err) => {
        console.error('Error', err)
      }}
      onLoad={() => {
        setScriptLoaded(true)
      }}
    />
  </div>;
};

export default EyeTracking;
