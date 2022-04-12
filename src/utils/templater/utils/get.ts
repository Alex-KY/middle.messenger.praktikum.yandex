import { Indexed } from "../../types";

export default function get (obj: Indexed | unknown, path: string, defaultValue?: unknown) {
  const keys = path.match(/\w{1,}/g) || [];

  let result = obj;

  for (const key of keys) {
    if (result instanceof Object) {
      result = Object.entries(result)
        .find(([resKey,]) => resKey === key)?.[1] as string;
    } else if (Array.isArray(result)) {
      const num: number = +key;
      result = result[num];
    }
    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
