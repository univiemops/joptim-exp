import React, { useEffect } from 'react';
import { useScript } from './useScript'


const OPTIONAL_SUBURI = "/joptim"
const webgazerScript = `${OPTIONAL_SUBURI}/webgazer.js`


interface EyeTrackingProps {
  calibrated: boolean;
}


const EyeTracking: React.FC<EyeTrackingProps> = ({ calibrated }) => {
  const [webgazer, setWebgazer] = React.useState<Webgazer | undefined>()
  const status = useScript(webgazerScript, {
    removeOnUnmount: false,
  })

  useEffect(() => {
    if (window) {
      if (!webgazer) {
        setWebgazer(window.webgazer)
      }
      if (webgazer && !calibrated) {
        console.log("starting webgazer calibration")
        webgazer.setRegression('weightedRidge')
          .showFaceOverlay(false)
          .saveDataAcrossSessions(false) // TODO: check what "session" means.
          .begin();
      }
      if (webgazer && calibrated) {
        webgazer.end() // TODO: check if we need this 
        console.log("finished webgazer calibration")
        console.log("starting webgazer data collection")

        // webgazer
        //   .showVideo(false)
        //   .setGazeListener((data: any, elapsedTime: any) => {
        //     if (data && data.x !== null && data.y !== null) {
        //       console.log(`Gaze data: t=${elapsedTime / 1000}, x=${data.x.toFixed(4)}, y=${data.y.toFixed(4)}`);
        //     }
        //   })
        //   .begin();

        webgazer
          .showVideo(false)
          .setGazeListener((data: any) => {
            if (data && data.x !== null && data.y !== null) {
              const currentUnixTime = Math.floor(new Date().getTime() / 1000);
              const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              console.log(`Gaze data: timestamp=${currentUnixTime}, x=${data.x.toFixed(4)}, y=${data.y.toFixed(4)}, viewport=${viewportWidth}x${viewportHeight}`);
            }
          })
          .begin();



        return () => {
          if (webgazer) {
            webgazer.end();
          }
        };
      }
    }
  }, [calibrated, status, webgazer]);

  return <div style={{ display: 'none' }}>
  </div>;
};

export default EyeTracking;
