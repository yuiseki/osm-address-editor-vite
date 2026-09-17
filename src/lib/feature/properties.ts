// MapLibre hands feature properties back as JSON strings on some code paths and
// as the original value on others, and which one you get changed in v6. Accept
// both so the caller does not have to care.
export const parseFeatureProperty = <T>(value: unknown): T => {
  if (typeof value === "string") {
    return JSON.parse(value) as T;
  }
  return value as T;
};
