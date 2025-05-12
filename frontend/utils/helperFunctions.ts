export function sumOfArray(ar: Array<number>) {
  var sum = 0;
  for (var i = 0; i < ar.length; i++) {
    if (typeof ar[i] == `number`) sum += ar[i];
  }
  return sum;
}

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function getCosts(tasks: number[], assignments: number[][]) {
  const indices = assignments.map((a) => a[0]);
  return sumOfArray(tasks) - sumOfArray(indices.map((i) => tasks[i]));
}

export function getUtility(tasks: number[], assignments: number[][]) {
  const indices = assignments.map((a) => a[0]);
  return sumOfArray(indices.map((i) => tasks[i]));
}

// currently not in use:
export const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
