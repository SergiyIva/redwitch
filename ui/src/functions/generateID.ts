export const generate = (): string => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 36; i++) {
    if (
      result.length === 8 ||
      result.length === 13 ||
      result.length === 18 ||
      result.length === 23
    ) {
      result += "-";
      continue;
    }
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
// bc4fd093-0f12-4be9-abe1-eb6e2a2dee7c
