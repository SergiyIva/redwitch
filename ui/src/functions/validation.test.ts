import { ConfigValidation, InputObject, validation } from "./validation";

describe("function validation", () => {
  test("check optional params is empty", () => {
    const config: ConfigValidation = {
      optional: [
        "array",
        "content",
        "email",
        "message",
        "name",
        "other",
        "password",
        "phone",
        "price",
        "repeatPassword",
        "username"
      ]
    };
    const validFunc = validation(config);
    const input: InputObject = {
      email: "",
      phone: "",
      array: [],
      price: 0,
      content: "",
      password: "",
      username: "",
      name: "",
      message: "",
      other: "",
      repeatPassword: ""
    };
    const res = validFunc(input);
    expect(res.isValid).toBeTruthy();
  });
  test("optional params not empty", () => {
    const validFunc = validation();
    const input: InputObject = {
      email: "",
      phone: "",
      array: [],
      price: 0,
      content: "",
      password: "",
      username: "",
      name: "",
      message: "",
      other: "",
      repeatPassword: ""
    };
    const res = validFunc(input);
    expect(res.isValid).not.toBeTruthy();
  });
  const testValidateField = (
    field: keyof InputObject,
    optns: {
      value: string;
      message: string;
      messageOptn: string | undefined;
      isValid: boolean;
      isValidOptn: boolean;
    }
  ) => {
    const validateFunc = validation();
    const optionalFunc = validation({ optional: [field] });

    const resWithoutValue = validateFunc({ [field]: optns.value });
    const optnResWithoutValue = optionalFunc({ [field]: optns.value });
    expect(resWithoutValue.isValid === optns.isValid).toBeTruthy();
    expect(resWithoutValue[field]).toBe(optns.message);
    expect(optnResWithoutValue.isValid === optns.isValidOptn).toBeTruthy();
    expect(optnResWithoutValue[field]).toBe(optns.messageOptn);
  };
  test.each`
    value              | message                                  | messageOptn                              | isValid  | isValidOptn
    ${""}              | ${"Заполните поле Логин!"}               | ${undefined}                             | ${false} | ${true}
    ${"Name Fake"}     | ${"isValid"}                             | ${"isValid"}                             | ${true}  | ${true}
    ${"Eva"}           | ${"Логин должен быть длиннее 4 знаков!"} | ${"Логин должен быть длиннее 4 знаков!"} | ${false} | ${false}
    ${"1234567890123"} | ${"Логин должен быть короче 12 знаков!"} | ${"Логин должен быть короче 12 знаков!"} | ${false} | ${false}
    ${"Сергей"}        | ${"isValid"}                             | ${"isValid"}                             | ${true}  | ${true}
    ${"! @#$%*(+="}    | ${"Логин должен содержать буквы/числа!"} | ${"Логин должен содержать буквы/числа!"} | ${false} | ${false}
    ${"      "}        | ${"Заполните поле Логин!"}               | ${undefined}                             | ${false} | ${true}
  `(
    "multycheck username",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("username", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                            | message                                | messageOptn                            | isValid  | isValidOptn
    ${""}                                            | ${"Заполните поле Имя!"}               | ${undefined}                           | ${false} | ${true}
    ${"Jordana Bruno"}                               | ${"isValid"}                           | ${"isValid"}                           | ${true}  | ${true}
    ${"Сергей"}                                      | ${"isValid"}                           | ${"isValid"}                           | ${true}  | ${true}
    ${"! @#$%*(+="}                                  | ${"Имя должно содержать буквы!"}       | ${"Имя должно содержать буквы!"}       | ${false} | ${false}
    ${"qwertyuiopasdfghjklzxcvbnm1234567".repeat(2)} | ${"Имя должно быть короче 64 знаков!"} | ${"Имя должно быть короче 64 знаков!"} | ${false} | ${false}
    ${"Eva"}                                         | ${"isValid"}                           | ${"isValid"}                           | ${true}  | ${true}
  `(
    "multycheck name",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("name", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                   | message                                    | messageOptn                                | isValid  | isValidOptn
    ${""}                                   | ${"Заполните поле Email!"}                 | ${undefined}                               | ${false} | ${true}
    ${"email"}                              | ${"Email должен содержать знак @!"}        | ${"Email должен содержать знак @!"}        | ${false} | ${false}
    ${"@email.ru"}                          | ${"Email должен содержать знаки до @!"}    | ${"Email должен содержать знаки до @!"}    | ${false} | ${false}
    ${"user@"}                              | ${"Email должен содержать знаки после @!"} | ${"Email должен содержать знаки после @!"} | ${false} | ${false}
    ${"user@email"}                         | ${"Email должен содержать домен!"}         | ${"Email должен содержать домен!"}         | ${false} | ${false}
    ${"email12345".repeat(19) + "@mail.ru"} | ${"isValid"}                               | ${"isValid"}                               | ${true}  | ${true}
    ${"email12345".repeat(20) + "@mail.ru"} | ${"Email должен быть короче 201 знака!"}   | ${"Email должен быть короче 201 знака!"}   | ${false} | ${false}
  `(
    "multycheck email",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("email", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                  | message                                   | messageOptn                               | isValid  | isValidOptn
    ${""}                                  | ${"Заполните поле Пароль!"}               | ${undefined}                              | ${false} | ${true}
    ${"12345"}                             | ${"Пароль должен быть длиннее 6 знаков!"} | ${"Пароль должен быть длиннее 6 знаков!"} | ${false} | ${false}
    ${"! @#$%*(+="}                        | ${"Пароль должен содержать буквы/числа!"} | ${"Пароль должен содержать буквы/числа!"} | ${false} | ${false}
    ${"1234567890qwertyuiopasdfghjkl;'zx"} | ${"Пароль должен быть короче 32 знаков!"} | ${"Пароль должен быть короче 32 знаков!"} | ${false} | ${false}
    ${"someBadPassword"}                   | ${"isValid"}                              | ${"isValid"}                              | ${true}  | ${true}
  `(
    "multycheck password",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("password", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  // тут не удобно выписывать все параметры для each метода, поэтому данная реализация
  test("repeat password check", () => {
    const validateFunc = validation();
    const optionalFunc = validation({ optional: ["password"] });

    const emptyInput: InputObject = {
      password: "",
      repeatPassword: ""
    };
    const emptyRes = validateFunc(emptyInput);
    expect(emptyRes.isValid).not.toBeTruthy();
    expect(emptyRes.password).toBe("Заполните поле Пароль!");
    expect(emptyRes.repeatPassword).toBe("isValid");

    const emptyOptnRes = optionalFunc(emptyInput);
    expect(emptyOptnRes.isValid).toBeTruthy();
    expect(emptyOptnRes.password).toBe(undefined);
    expect(emptyOptnRes.repeatPassword).toBe("isValid");

    const input: InputObject = {
      password: "someBadPassword",
      repeatPassword: "someBadPassword"
    };
    const res = validateFunc(input);
    expect(res.isValid).toBeTruthy();
    expect(res.password).toBe("isValid");
    expect(res.repeatPassword).toBe("isValid");

    const badInput: InputObject = {
      password: "someBadPassword",
      repeatPassword: "anotherBadPassword"
    };
    const badres = validateFunc(badInput);
    expect(badres.isValid).not.toBeTruthy();
    expect(badres.password).toBe("isValid");
    expect(badres.repeatPassword).toBe("Пароли не совпадают!");
  });
  test.each`
    value            | message                               | messageOptn                           | isValid  | isValidOptn
    ${""}            | ${"Заполните поле Номер телефона!"}   | ${undefined}                          | ${false} | ${true}
    ${"qwerrtyui1"}  | ${"Номер должен содержать 10 чисел!"} | ${"Номер должен содержать 10 чисел!"} | ${false} | ${false}
    ${"12345678909"} | ${"Номер должен содержать 10 чисел!"} | ${"Номер должен содержать 10 чисел!"} | ${false} | ${false}
    ${"1234567890"}  | ${"isValid"}                          | ${"isValid"}                          | ${true}  | ${true}
  `(
    "multycheck phone",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("phone", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                 | message                                          | messageOptn                                      | isValid  | isValidOptn
    ${""}                                 | ${"Заполните поле!"}                             | ${undefined}                                     | ${false} | ${true}
    ${"qwertyuio1".repeat(101)}           | ${"Поле должно содержать не более 1000 знаков!"} | ${"Поле должно содержать не более 1000 знаков!"} | ${false} | ${false}
    ${"123456789"}                        | ${"Поле должно содержать минимум 10 знаков!"}    | ${"Поле должно содержать минимум 10 знаков!"}    | ${false} | ${false}
    ${"Some good content for something."} | ${"isValid"}                                     | ${"isValid"}                                     | ${true}  | ${true}
  `(
    "multycheck content",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("content", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                 | message                                          | messageOptn                                      | isValid  | isValidOptn
    ${""}                                 | ${"Заполните поле!"}                             | ${undefined}                                     | ${false} | ${true}
    ${"qwertyuio1".repeat(101)}           | ${"Поле должно содержать не более 1000 знаков!"} | ${"Поле должно содержать не более 1000 знаков!"} | ${false} | ${false}
    ${"123456789"}                        | ${"isValid"}                                     | ${"isValid"}                                     | ${true}  | ${true}
    ${"Some good content for something."} | ${"isValid"}                                     | ${"isValid"}                                     | ${true}  | ${true}
  `(
    "multycheck message",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("message", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                     | message                                        | messageOptn                                    | isValid  | isValidOptn
    ${""}                     | ${"Заполните поле!"}                           | ${undefined}                                   | ${false} | ${true}
    ${"qwertyuio1".repeat(4)} | ${"Поле должно содержать не более 32 знаков!"} | ${"Поле должно содержать не более 32 знаков!"} | ${false} | ${false}
    ${"Not long text"}        | ${"isValid"}                                   | ${"isValid"}                                   | ${true}  | ${true}
  `(
    "multycheck other",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("other", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value                                     | message                                         | messageOptn                                     | isValid  | isValidOptn
    ${[]}                                     | ${"Заполните поле!"}                            | ${undefined}                                    | ${false} | ${true}
    ${["   "]}                                | ${"Поле должно содержать буквы/числа/символы!"} | ${"Поле должно содержать буквы/числа/символы!"} | ${false} | ${false}
    ${"text to split ".repeat(11).split(" ")} | ${"Поле должно содержать не более 100 знаков!"} | ${"Поле должно содержать не более 100 знаков!"} | ${false} | ${false}
    ${["one", "two", "three"]}                | ${"isValid"}                                    | ${"isValid"}                                    | ${true}  | ${true}
  `(
    "multycheck array",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("array", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
  test.each`
    value          | message                                       | messageOptn                                   | isValid  | isValidOptn
    ${0}           | ${"Заполните поле цены!"}                     | ${undefined}                                  | ${false} | ${true}
    ${12345678901} | ${"Поле должно содержать не более 32 чисел!"} | ${"Поле должно содержать не более 32 чисел!"} | ${false} | ${false}
    ${1200}        | ${"isValid"}                                  | ${"isValid"}                                  | ${true}  | ${true}
  `(
    "multycheck price",
    ({ value, message, messageOptn, isValid, isValidOptn }) => {
      testValidateField("price", {
        value,
        message,
        messageOptn,
        isValid,
        isValidOptn
      });
    }
  );
});
