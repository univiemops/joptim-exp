/**
 * This function calculates a measurement for how precise
 * the eye tracker currently is which is displayed to the user
 */
function calculatePrecision(past50Array: [number[], number[]]): number {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Retrieve the last 50 gaze prediction points
  const x50 = past50Array[0];
  const y50 = past50Array[1];

  // Calculate the position of the point the user is staring at
  const staringPointX = windowWidth / 2;
  const staringPointY = windowHeight / 2;

  const precisionPercentages: number[] = new Array(50);
  calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
  const precision = calculateAverage(precisionPercentages);

  // Return the precision measurement as a rounded percentage
  return Math.round(precision);
}

/**
 * Calculate percentage accuracy for each prediction based on the distance of
 * the prediction point from the center point (uses the window height as
 * the lower threshold 0%)
 */
function calculatePrecisionPercentages(
  precisionPercentages: number[],
  windowHeight: number,
  x50: number[],
  y50: number[],
  staringPointX: number,
  staringPointY: number
): void {
  for (let x = 0; x < 50; x++) {
    // Calculate the distance between each prediction and staring point
    const xDiff = staringPointX - x50[x];
    const yDiff = staringPointY - y50[x];
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    // Calculate precision percentage
    const halfWindowHeight = windowHeight / 2;
    let precision = 0;
    if (distance <= halfWindowHeight && distance > -1) {
      precision = 100 - (distance / halfWindowHeight) * 100;
    } else if (distance > halfWindowHeight) {
      precision = 0;
    } else if (distance > -1) {
      precision = 100;
    }

    // Store the precision
    precisionPercentages[x] = precision;
  }
}

/**
 * Calculates the average of all precision percentages calculated
 */
function calculateAverage(precisionPercentages: number[]): number {
  let precision = 0;
  for (let x = 0; x < 50; x++) {
    precision += precisionPercentages[x];
  }
  precision /= 50;
  return precision;
}

