import React, { useEffect } from 'react';
import styles from "./webgazer.module.css";
import { UseScriptStatus } from '@/utils/useScript';

interface EyeTrackingProps {
  status: UseScriptStatus;
  calibrated: boolean;
}


const EyeTracking: React.FC<EyeTrackingProps> = ({ status, calibrated }) => {
  const [webgazer, setWebgazer] = React.useState<any>()
  console.log("status", status)
  console.log("calibrated", calibrated)

  const modifyElementStyle = () => {
    var wB = document.getElementById("webgazerGazeDot");
    if (wB) {
      wB.style.background = "transparent";
      wB.style.width = "90px";
      wB.style.height = "90px";
      wB.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.15)";
      wB.style.zIndex = "0";
    } else {
      console.warn("Element with ID 'webgazerGazeDot' not found. Retrying...");
      setTimeout(modifyElementStyle, 100);
    }
  };

  useEffect(() => {
    modifyElementStyle();
  }, []); // Empty dependency array ensures that this effect runs once after the component mounts


  useEffect(() => {
    if (window) {
      if (!webgazer) {
        setWebgazer(window.webgazer)
      }
      if (webgazer && !calibrated) {
        webgazer.saveDataAcrossSessions = true
        webgazer.setRegression("ridge");
        webgazer.params.videoViewerWidth = 240;
        webgazer.params.videoViewerHeight = 180;
        webgazer
          .begin()
      }
      if (webgazer && calibrated) {

        webgazer.showPredictionPoints(true)
        webgazer.setGazeListener((data: any, elapsedTime: any) => {
          if (data && data.x !== null && data.y !== null) {
            console.log(`Gaze data: t=${elapsedTime / 1000}, x=${data.x.toFixed(4)}, y=${data.y.toFixed(4)}`);
          }
        });
      }

      // return () => {
      //   webgazer.end();
      // };
    }
  }, [status, calibrated]);

  return <div></div>
  //return <div className={styles.webgazerVideoFeed} style={{ display: 'none' }}></div>;
};

export default EyeTracking;
