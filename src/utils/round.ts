export default function round(value: string | number, decimals: number) {
  return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);
}
