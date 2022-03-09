export default function get (obj: any, path: any, defaultValue?: any) {
  const keys = [...path.match(/\w{1,}/g)];

  let result = obj;
  for (let key of keys) {
    result = result?.[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
