import { print } from "./utils";

it("test print function to send message to console", () => {
  const execute = jest.fn().mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(execute);
  expect(execute).not.toBeCalled();
  print("test");
  expect(execute).toBeCalledTimes(1);
});
