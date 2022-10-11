/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Hooks1 = "$nil" | "$notnil" | "$none";
type Hooks2 = "true" | "false";
type Thruthy = boolean | object | Function;
type Index = string | number;

type NestedKeyOf<P extends object, T = Required<P>> = {
  [Key in keyof T & Index]: T[Key] extends Thruthy
    ? Key | `${Key}.${Hooks2}` | `${Key}.${Hooks2}.${NestedKeyOf<Omit<T, Key>>}`
    :
        | `${Key}.${Hooks1}`
        | `${Key}.${T[Key] extends Thruthy
            ? never
            : (T[Key] & Index) | `${T[Key] & Index}.${NestedKeyOf<Omit<T, Key>>}`}`;
}[keyof T & Index];

export type VariantsOf<T extends Record<string, any>> = {
  [key in NestedKeyOf<T> | "$all"]?: any;
};
