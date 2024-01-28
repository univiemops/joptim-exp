/**
 * Sets storingPoints to true, so all the occurring prediction
 * points are stored
 */
function storePointsVariable(): void {
  webgazer.params.storingPoints = true;
}

/**
 * Sets storingPoints to false, so prediction points aren't
 * stored anymore
 */
function stopStoringPointsVariable(): void {
  webgazer.params.storingPoints = false;
}

