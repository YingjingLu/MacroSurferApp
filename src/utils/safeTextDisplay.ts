export const safeNumberDisplay = (num: number, unit: string, fallback: string) : string => {
  if (num === null) {
    return fallback;
  }
  return num.toFixed(2) + unit;
};
