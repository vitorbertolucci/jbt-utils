import fetch, { RequestInit } from 'node-fetch';
import { AbortController } from 'abort-controller';

import { TimeoutError } from '../errors/TimeoutError.js';

export type HttpFetchResponseType = 'json' | 'text' | 'buffer' | null;

interface IDefaultOptions extends RequestInit {
  timeout: number;
  response_type: HttpFetchResponseType;
}

const defaultOptions: IDefaultOptions = {
  timeout: 60000,
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

    if (!response_type) {
      return response;
    }

    if (response_type === 'buffer') {
      const bufferResponse = await response.buffer();

      return bufferResponse;
    }

    if (response_type === 'text') {
      const textResponse = await response.text();

      return textResponse;
    }

    // Default is response_type is "json"
    const jsonResponse = await response.json();

    return jsonResponse;
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
