import { randArrayElt } from "./randArrayElt";

it.each([
  [[1, 2, 3, 4, 5, 6]],
  [["first", "second", "thead", "fourth", "fives"]]
])("function randArrayElt return correct value", (arr: unknown[]) => {
  for (let i = 0; i <= 100; i++) {
    let res = randArrayElt(arr);
    expect(arr.indexOf(res) >= 0).toBeTruthy();
  }
});
