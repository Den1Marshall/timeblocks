export const serialize = <T>(data: T): T => JSON.parse(JSON.stringify(data));
