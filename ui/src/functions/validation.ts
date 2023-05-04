export type InputObject = {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  phone?: string;
  name?: string;
  price?: number;
  content?: string;
  message?: string;
  other?: string;
  array?: string[];
};

export type Messages = {
  isValid: boolean;
} & { [key in keyof InputObject]: string };

export type ConfigValidation = {
  optional: (keyof InputObject)[];
};

const defaultConfig: ConfigValidation = {
  optional: []
};

export const validation =
  (config: ConfigValidation = defaultConfig) =>
  (object: InputObject): Messages => {
    let messages: Messages = { isValid: false };
    let isValidate;

    const username = object.username?.trim();
    const name = object.name;
    const email = object.email?.trim().toLowerCase();
    const password = object.password;
    const repeatPassword = object.repeatPassword;
    const phone = object.phone;
    const content = object.content;
    const message = object.message;
    const other = object.other;
    const array = object.array;
    const price = object.price;

    if (object.hasOwnProperty("username")) {
      if (!username) {
        if (config.optional.indexOf("username") < 0) {
          messages.username = "Заполните поле Логин!";
          isValidate = false;
        }
      } else if (username.length < 4) {
        messages.username = "Логин должен быть длиннее 4 знаков!";
        isValidate = false;
      } else if (username.length > 12) {
        messages.username = "Логин должен быть короче 12 знаков!";
        isValidate = false;
      } else if (
        !/\w/.test(username) &&
        !/\p{Script=Cyrillic}+/u.test(username)
      ) {
        messages.username = "Логин должен содержать буквы/числа!";
        isValidate = false;
      } else {
        messages.username = "isValid";
      }
    }

    if (object.hasOwnProperty("name")) {
      if (!name) {
        if (config.optional.indexOf("name") < 0) {
          messages.name = "Заполните поле Имя!";
          isValidate = false;
        }
      } else if (!/\w/.test(name) && !/\p{Script=Cyrillic}/u.test(name)) {
        messages.name = "Имя должно содержать буквы!";
        isValidate = false;
      } else if (name.length > 64) {
        messages.name = "Имя должно быть короче 64 знаков!";
        isValidate = false;
      } else {
        messages.name = "isValid";
      }
    }

    if (object.hasOwnProperty("email")) {
      if (!email) {
        if (config.optional.indexOf("email") < 0) {
          messages.email = "Заполните поле Email!";
          isValidate = false;
        }
      } else if (!/@/.test(email)) {
        messages.email = "Email должен содержать знак @!";
        isValidate = false;
      } else if (!/^[\w_.-]+@/.test(email)) {
        messages.email = "Email должен содержать знаки до @!";
        isValidate = false;
      } else if (!/@(\w)+/.test(email)) {
        messages.email = "Email должен содержать знаки после @!";
        isValidate = false;
      } else if (!/(\.+\w{2,6})$/.test(email)) {
        messages.email = "Email должен содержать домен!";
        isValidate = false;
      } else if (email.length > 200) {
        messages.email = "Email должен быть короче 201 знака!";
        isValidate = false;
      } else {
        messages.email = "isValid";
      }
    }

    if (object.hasOwnProperty("password")) {
      if (!password) {
        if (config.optional.indexOf("password") < 0) {
          messages.password = "Заполните поле Пароль!";
          isValidate = false;
        }
      } else if (password.length < 6) {
        messages.password = "Пароль должен быть длиннее 6 знаков!";
        isValidate = false;
      } else if (!/\w/.test(password)) {
        messages.password = "Пароль должен содержать буквы/числа!";
        isValidate = false;
      } else if (password.length > 32) {
        messages.password = "Пароль должен быть короче 32 знаков!";
        isValidate = false;
      } else {
        messages.password = "isValid";
      }
    }

    if (object.hasOwnProperty("repeatPassword")) {
      if (repeatPassword === password) {
        messages.repeatPassword = "isValid";
      } else {
        messages.repeatPassword = "Пароли не совпадают!";
        isValidate = false;
      }
    }

    if (object.hasOwnProperty("phone")) {
      if (!phone) {
        if (config.optional.indexOf("phone") < 0) {
          messages.phone = "Заполните поле Номер телефона!";
          isValidate = false;
        }
      } else if (!/\d/.test(phone) || phone.match(/\d/g)!.length !== 10) {
        messages.phone = "Номер должен содержать 10 чисел!";
        isValidate = false;
      } else {
        messages.phone = "isValid";
      }
    }

    if (object.hasOwnProperty("content")) {
      if (!content) {
        if (config.optional.indexOf("content") < 0) {
          messages.content = "Заполните поле!";
          isValidate = false;
        }
      } else if (content.length > 1000) {
        messages.content = "Поле должно содержать не более 1000 знаков!";
        isValidate = false;
      } else if (content.length < 10) {
        messages.content = "Поле должно содержать минимум 10 знаков!";
        isValidate = false;
      } else {
        messages.content = "isValid";
      }
    }

    if (object.hasOwnProperty("message")) {
      if (!message) {
        if (config.optional.indexOf("message") < 0) {
          messages.message = "Заполните поле!";
          isValidate = false;
        }
      } else if (message.length > 1000) {
        messages.message = "Поле должно содержать не более 1000 знаков!";
        isValidate = false;
      } else {
        messages.message = "isValid";
      }
    }

    if (object.hasOwnProperty("other")) {
      if (!other) {
        if (config.optional.indexOf("other") < 0) {
          messages.other = "Заполните поле!";
          isValidate = false;
        }
      } else if (other.length > 32) {
        messages.other = "Поле должно содержать не более 32 знаков!";
        isValidate = false;
      } else {
        messages.other = "isValid";
      }
    }

    if (object.hasOwnProperty("array")) {
      if (!array || !array.length) {
        if (config.optional.indexOf("array") < 0) {
          messages.array = "Заполните поле!";
          isValidate = false;
        }
      } else if (
        !/\w/.test(array.join("")) &&
        !/\p{Script=Cyrillic}/u.test(array.join(""))
      ) {
        messages.array = "Поле должно содержать буквы/числа/символы!";
        isValidate = false;
      } else if (array.join("").length > 100) {
        messages.array = "Поле должно содержать не более 100 знаков!";
        isValidate = false;
      } else {
        messages.array = "isValid";
      }
    }

    if (object.hasOwnProperty("price")) {
      if (!price) {
        if (config.optional.indexOf("price") < 0) {
          messages.price = "Заполните поле цены!";
          isValidate = false;
        }
      } else if (String(price).length > 10) {
        messages.price = "Поле должно содержать не более 32 чисел!";
        isValidate = false;
      } else {
        messages.price = "isValid";
      }
    }

    messages.isValid = isValidate === undefined;

    return messages;
  };
