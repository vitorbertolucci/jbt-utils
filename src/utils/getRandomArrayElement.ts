import getRandomInteger from './getRandomInteger';

export default function getRandomArrayElement<I>(arr: I[]): I {
  return arr[getRandomInteger(0, arr.length - 1)];
}
