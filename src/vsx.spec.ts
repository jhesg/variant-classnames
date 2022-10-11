import data from "./data";
import { vsx } from "./vsx";

describe.each(data)(".add($a, $b)", ({ id, output, props, variants }) => {
  const [values, matches] = vsx(variants, props);

  test(`${id}`, () => {
    expect(values).toBe(output.values);
    output.matches.forEach((value, key) => {
      expect(matches.has(key as any)).toBe(true);
      expect(matches.get(key as any)).toBe(value);
    });
  });
});
