export default [
  {
    id: "standard matching",
    props: {
      color: "blue",
      size: "large",
    },
    variants: {
      "color.blue": "blue",
      "size.large": "large",
    },
    output: {
      values: "blue large",
      matches: new Map([
        ["color.blue", "blue"],
        ["size.large", "large"],
      ]),
    },
  },
  {
    id: "matching with $all hook",
    props: {
      color: "blue",
      size: "large",
    },
    variants: {
      $all: "$all",
      "color.blue": "blue",
      "size.large": "large",
    },
    output: {
      values: "$all blue large",
      matches: new Map([
        ["color.blue", "blue"],
        ["size.large", "large"],
      ]),
    },
  },
];
