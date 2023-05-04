type RandomArrayElement = <T>(arr: T[]) => T;

export const randArrayElt: RandomArrayElement = (arr) => {
  const randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
};
