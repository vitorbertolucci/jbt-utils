function convertISOtoUTF8(isoString: string) {
  const buffer = Buffer.from(isoString, 'latin1');
  return buffer.toString('utf8');
}

export default function parseCloudflareHeader(
  header: string | string[] | undefined,
) {
  let parsed;

  if (header) {
    if (Array.isArray(header)) {
      [parsed] = header;
    } else {
      parsed = header;
    }
  }

  if (typeof parsed === 'string') {
    return convertISOtoUTF8(parsed);
  }

  return parsed;
};
