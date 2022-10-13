export function formatMiliseconds(miliseconds: number) {
  if (miliseconds < 1000) return `${miliseconds.toFixed(0)} ms`;
  const seconds = Math.floor(miliseconds / 1000);
  const restOfMiliseconds = Number(miliseconds % 1000).toPrecision(2);
  return `${seconds}.${restOfMiliseconds} s`;
}
