import { Request } from 'express';

export default function getIpFromRequest(request: Request) {
  let callerIp;

  const { headers, socket, ip } = request;

  if (headers['x-forwarded-for']) {
    const forwarded = headers['x-forwarded-for'];
    const ips =
      typeof forwarded === 'string' ? forwarded.split(',') : forwarded;

    [callerIp] = ips;
  } else if (socket && socket.remoteAddress) {
    callerIp = socket.remoteAddress;
  } else {
    callerIp = ip;
  }

  if (!callerIp) {
    return undefined;
  }

  callerIp = callerIp.trim();

  return callerIp;
}
