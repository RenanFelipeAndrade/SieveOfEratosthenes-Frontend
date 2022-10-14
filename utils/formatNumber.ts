export function formatNumber(number: number) {
  const stringNumber = number.toString();
  const commaAmount = Math.floor((stringNumber.length - 1) / 3);
  const firstDigits = stringNumber.length - commaAmount * 3;
  let newStringNumber = stringNumber.slice(0, firstDigits);
  for (let i = 1; i <= commaAmount; i++) {
    const initialPosition = stringNumber.length - i * 3;
    const endPosition = stringNumber.length - i * 3 + 3;
    newStringNumber += "," + stringNumber.slice(initialPosition, endPosition);
  }
  return newStringNumber;
}
