export default function get (obj: unknown, path: string, defaultValue?: unknown) {
  const keys = path.match(/\w{1,}/g) || [];

  let result = obj;

  for (const key of keys) {
    result = result?.[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
