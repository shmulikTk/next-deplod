export function splitFirstOccurrence(str: string, separator: string) {
  const [first, ...rest] = str.split(separator);
  const remainder = rest.join('-');
  return [first, remainder];
}

export function parseChangePasswordParams(path: string) {
    const [, params ] = splitFirstOccurrence(path, '?');
    const [temporaryPasswordParam, username ] = splitFirstOccurrence(params, '&username=');
    const [, temporaryPassword ] = splitFirstOccurrence(temporaryPasswordParam, '=');
    return { username, temporaryPassword }
}
