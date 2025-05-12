interface Window {
  webgazer: any;
  rrwebRecord: any;
  rrwebReplayer: any;
  rrweb: any;
  rrwebPlayer: any;
}

interface Webgazer {
  params: {
    storingPoints: boolean;
  };
  clearData(): Webgazer;
  end(): void;
  begin(onFail?: () => void): void;
  setRegression(regression: string): Webgazer;
  setTracker(regression: string): Webgazer;
  showVideoPreview(value: boolean): Webgazer;
  showFaceOverlay(value: boolean): Webgazer;
  showVideo(value: boolean): Webgazer;
  showPredictionPoints(value: boolean): Webgazer;
  setGazeListener(listener: (data: { x: number; y: number }, clock: number) => void): typeof webgazer;
  applyKalmanFilter(value: boolean): Webgazer;
  showFaceFeedbackBox(value: boolean): Webgazer;
  saveDataAcrossSessions(value: boolean): Webgazer;
  getStoredPoints(): [number[], number[]];
  checkEyesInValidationBox(): boolean;
}

declare const webgazer: Webgazer;
