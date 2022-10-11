import { chunk, isNil } from "./utils";

const comparators = {
  $nil: (_: string, b: unknown) => isNil(b),
  $notnil: (_: string, b: unknown) => !isNil(b),
  thruthy: (a: string, _: unknown) => String(a) === "true",
  default: (a: string, b: unknown) => String(a) === String(b),
};

const hooks = ["$none", "$nil", "$notnil"];

const forwardPropNames = ["className", "classNames"];

type TProps = {
  [key: string]: any;
  className?: string;
};

export const vsx = <TVariants extends Record<string, any>>(
  variants: TVariants,
  props: TProps,
  forwardProps: string[] = forwardPropNames,
): [string, Map<keyof TVariants, any>] => {
  const chunks: string[] = [];
  const matches = new Map<keyof TVariants, any>();
  const heads: string[] = [];

  const local = Object.entries(variants).filter(([selector]) => !selector.includes("$none"));

  const global = Object.entries(variants).filter(([selector]) => selector.includes("$none"));

  local.forEach(([selector, variant]) => {
    const fragments = chunk(selector.split("."), 2);

    const isMatching = fragments.every(([propName, valueOrHook]) => {
      const isHook = hooks.includes(valueOrHook);
      const isThruthy = typeof props[propName] === "object";

      const defaultComparator = isThruthy ? "thruthy" : "default";
      const comparator = isHook ? valueOrHook : defaultComparator;

      return comparators[comparator](valueOrHook, props[propName]);
    });

    if (isMatching) {
      chunks.push(variant);
      matches.set(selector as keyof TVariants, variant);
      heads.push(selector.replace(/([^.]+$)/, ""));
    }
  });

  global.forEach(([selector, variant]) => {
    const head = selector.replace(/([^.]+$)/, "");
    const hook = selector.match(/([^.]+$)/)?.[0];

    if (heads.includes(head) && hook === "$none") {
      return;
    }

    if (!heads.includes(head) && hook === "$none") {
      chunks.push(variant);
    }
  });

  if (variants.$all) {
    chunks.unshift(variants.$all);
  }

  if (forwardProps) {
    forwardProps.forEach((propName) => !isNil(props[propName]) && chunks.unshift(props[propName]));
  }

  return [Array.from(new Set(chunks)).join(" "), matches];
};

export default vsx;
