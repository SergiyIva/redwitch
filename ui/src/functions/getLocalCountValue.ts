export const getLocalCountValue = (
  count: number,
  one: string,
  few: string,
  many: string
) => {
  const valueForm = new Intl.PluralRules("ru").select(count);
  const commentValueName = {
    one,
    few,
    many
  };
  if (valueForm === "one" || valueForm === "few" || valueForm === "many")
    return `${count} ${commentValueName[valueForm]}`;
  return null;
};
