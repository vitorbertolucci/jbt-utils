import { randomInt } from 'crypto';

export default function getRandomInteger(min: number, max: number): number {
  return randomInt(min, max + 1);
}
