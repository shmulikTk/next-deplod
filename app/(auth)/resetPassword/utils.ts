export function splitFirstOccurrence(str: string, separator: string) {
  const [first, ...rest] = str.split(separator);
  const remainder = rest.join('-');
  return [first, remainder];
}

export function parseChangePasswordParams(path: string) {
    const [, params ] = splitFirstOccurrence(path, '?');
    const [codeParam, username ] = splitFirstOccurrence(params, '&username=');
    const [, code ] = splitFirstOccurrence(codeParam, '=');
    return { username, code }
}
