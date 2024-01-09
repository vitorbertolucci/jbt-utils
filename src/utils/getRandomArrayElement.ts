import getRandomInteger from './getRandomInteger.js';

export default function getRandomArrayElement<I>(arr: I[]): I {
  return arr[getRandomInteger(0, arr.length - 1)];
}
