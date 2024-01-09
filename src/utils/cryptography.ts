import { createHash } from 'node:crypto';

export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex');
}

export function sha512(content: string) {
  return createHash('sha512').update(content).digest('hex');
}
