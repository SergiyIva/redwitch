import "@testing-library/react";
import { getLocalCountValue } from "./getLocalCountValue";

test.each`
  value   | keyObj
  ${0}    | ${"many"}
  ${1}    | ${"one"}
  ${2}    | ${"few"}
  ${3}    | ${"few"}
  ${4}    | ${"few"}
  ${5}    | ${"many"}
  ${10}   | ${"many"}
  ${15}   | ${"many"}
  ${100}  | ${"many"}
  ${101}  | ${"one"}
  ${102}  | ${"few"}
  ${1000} | ${"many"}
  ${1003} | ${"few"}
`(
  "function getLocalCountValue",
  ({ value, keyObj }: { value: number; keyObj: "one" | "few" | "many" }) => {
    const mockData = {
      one: "экземпляр",
      few: "экземпляра",
      many: "экземпляров",
      some: "test"
    };

    const res = getLocalCountValue(
      value,
      mockData.one,
      mockData.few,
      mockData.many
    );

    expect(res?.trim()).toBe(`${value} ${mockData[keyObj]}`);
  }
);
