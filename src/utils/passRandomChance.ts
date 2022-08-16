import getRandomInteger from './getRandomInteger';

export default function passRandomChance(chance: number): boolean {
  const normalizedChance = Math.min(Math.max(chance, 0), 100);
  const random = getRandomInteger(1, 100);

  return random <= normalizedChance;
}
