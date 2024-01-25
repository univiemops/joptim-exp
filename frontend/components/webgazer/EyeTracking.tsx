import React, { useEffect } from 'react';
import styles from "./webgazer.module.css";

const EyeTracking: React.FC = () => {
  useEffect(() => {
    if (window) {
      const webgazer = window.webgazer
      webgazer
        .setRegression('ridge')
        .begin()
      webgazer.showPredictionPoints(true).setGazeListener((data: any, elapsedTime: any) => {
        if (data && data.x !== null && data.y !== null) {
          console.log(`Gaze data: t=${elapsedTime / 1000}, x=${data.x.toFixed(4)}, y=${data.y.toFixed(4)}`);
        }
      });
      webgazer.setVideoViewerSize(240, 180);
      return () => {
        webgazer.end();
      };
    }
  }, []);

  return <div className={styles.webgazerVideoFeed} style={{ display: 'none' }}></div>;
};

export default EyeTracking;
