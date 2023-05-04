import { generate } from "./generateID";

test("generateId return correct 36 chars ID", () => {
  const res: string[] = [];
  for (let i = 0; i <= 1000; i++) {
    const uuid: string = generate();
    res.push(uuid);
  }
  res.forEach((uuid) =>
    expect(uuid).toMatch(
      /^[abcdefghijklmnopqrstuvwxyz0123456789]{8}-[abcdefghijklmnopqrstuvwxyz0123456789]{4}-[abcdefghijklmnopqrstuvwxyz0123456789]{4}-[abcdefghijklmnopqrstuvwxyz0123456789]{4}-[abcdefghijklmnopqrstuvwxyz0123456789]{12}$/
    )
  );
});
