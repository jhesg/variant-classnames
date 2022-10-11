export const backfill = <T, F>(input: (T | F)[], size: number, fill: F): (T | F)[] => {
  const length = size > 0 ? Math.ceil(input.length / size) * size : input.length;
  return Array.from({ length }, (_, idx) => input[idx] ?? fill);
};

export const chunk = <T>(input: T[], size = 2, fill: any = true): [T, T][] => {
  const list = backfill(input, size, fill);
  const length = Math.ceil(list.length / size);

  return Array.from({ length }, () => list.splice(0, size)) as [T, T][];
};
