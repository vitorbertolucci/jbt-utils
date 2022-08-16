import fetch, { RequestInit } from 'node-fetch';
import AbortController from 'abort-controller';

import TimeoutError from '../errors/TimeoutError';

export type HttpFetchResponseType = 'json' | 'text' | 'buffer' | null;

interface IDefaultOptions extends RequestInit {
  timeout: number;
  response_type: HttpFetchResponseType;
}

const defaultOptions: IDefaultOptions = {
  timeout: 5000,
  response_type: 'json',
};

export default async function httpFetch(
  url: string,
  options: Partial<IDefaultOptions> = defaultOptions,
) {
  const { response_type, timeout, ...requestOptions } = {
    ...defaultOptions,
    ...options,
  };

  const abortController = new AbortController();
  const abortTimeout = setTimeout(() => {
    abortController.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...requestOptions,
      signal: abortController.signal,
    });

    clearTimeout(abortTimeout);

    if (response_type) {
      if (response_type === 'json') {
        const jsonResponse = await response.json();

        return jsonResponse;
      }
      if (response_type === 'buffer') {
        const bufferResponse = await response.buffer();

        return bufferResponse;
      }

      const textResponse = await response.text();

      return textResponse;
    }

    return response;
  } catch (error) {
    clearTimeout(abortTimeout);

    if (abortController.signal.aborted) {
      throw new TimeoutError(
        `Request to url ${url} timed out after ${timeout}ms.`,
      );
    }

    throw error;
  }
}
