import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Errors from "apollo-server-express";
import mgfs from "mongoose-gridfs";
dotenv.config();

const mainUrl = process.env.HOST;

export const signIn = async (
  parent,
  { username, password },
  { models, clientid }
) => {
  if (password.length > 1000 || username.length > 1000) {
    throw new Error("Invalid data.");
  }
  const user = await models.User.findOne({
    username
  });
  if (!user) {
    throw new Errors.AuthenticationError("Error signing in");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Errors.AuthenticationError("Error signing in");
  }
  await user.updateOne({ $addToSet: { clientId: clientid } });
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};
export const signUp = async (
  parent,
  { username, email, password },
  { models }
) => {
  throw new Error("This option is close now!");
  email = email.trim().toLowerCase();
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await models.User.create({
      username,
      email,
      password: hashed
    });
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyValue.email)
      throw new Error("Такой email уже зарегистрирован!");
    if (err.code === 11000 && err.keyValue.username)
      throw new Error("Такой логин уже зарегистрирован!");
    throw new Error("Ошибка при создании аккаунта");
  }
};
export const changeUserPassword = async (
  parent,
  { newPassword, password },
  { models, user }
) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Error("Ошибка при выполнении входа");
  }
  if (newPassword === password) {
    throw new Error("Пароль должен отличаться от изменяемого!");
  }
  const valid = await bcrypt.compare(password, me.password);
  if (!valid) {
    throw new Errors.AuthenticationError("Ошибка пароля");
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  try {
    await models.User.updateOne(
      {
        _id: user.id
      },
      {
        $set: {
          password: hashed
        }
      }
    );
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Ошибка при изменении пароля");
  }
};
export const changeUserLogin = async (
  parent,
  { username, email, password },
  { models, user }
) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Error("Ошибка при выполнении входа");
  }
  const valid = await bcrypt.compare(password, me.password);
  if (!valid) {
    throw new Errors.AuthenticationError("Ошибка пароля");
  }
  try {
    await models.User.updateOne(
      {
        _id: user.id
      },
      {
        $set: {
          username: username || me.username,
          email: email || me.email
        }
      }
    );
    return true;
  } catch (err) {
    throw new Error("Ошибка при смене логина");
  }
};
export const changeUserInfo = async (parent, args, { models, user }) => {
  if (!user) {
    throw new Errors.AuthenticationError("Войди в свой аккаунт сначала!");
  }
  try {
    await models.User.updateOne(
      {
        _id: user.id
      },
      {
        $set: {
          info: { ...args }
        }
      }
    );
    return true;
  } catch (err) {
    throw new Error("Ошибка при изменении информации");
  }
};
export const changeUserAvatar = async (parent, { file }, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError(
      "Ошибка, Вы должны быть авторизированны для выполнения данного действия!"
    );
  }
  // получаем мета-данные файла, capacitor - поток чтения, скрытый
  const { createReadStream, filename, mimetype, encoding, capacitor } =
    await file;

  const stream = createReadStream();
  //указываем имя коллекции д/сохранения файла, в данном случае
  // путь - db.avatars.files
  const Attachment = mgfs.createModel({ modelName: "Avatar" });
  const options = { filename, contentType: mimetype };
  const some = Attachment.write(options, stream, (error, file) => {
    if (error) console.log(error);
    else {
      console.log(file);
    }
  });
  console.log("---------------file written!\n", filename, mimetype, encoding);
  return models.User.findByIdAndUpdate(
    user.id,
    {
      $set: {
        avatar: `${mainUrl}/dbavatars/${some.options._id}`
      }
    },
    { new: true }
  );

  // // реализация с загрузкой прямо в файловую систему ПК, заменил на загрузку в ДБ
  // // обновляем ранее доб. документ, но уже с привязкой URL к id док-та в БД, а также с указанием расширения,
  // // взятого из первоначального имени файла
  // const imageId = mongoose.Types.ObjectId()
  // const imageName = imageId + filename.replace(/\S+\./, ".")
  // const updatedUser = await models.User.findByIdAndUpdate(user.id, {$set:{
  //         avatar: `http://localhost:5000/${imageName}`
  //     }},{new: true})
  // // путь к файлу на сервере с актуальным именем
  // const toPath = path.join(
  //     __dirname, '..', '..', 'img', `${imageName}`
  // )
  // // работа с потоком чтения
  // await new Promise((res,rej)=>{
  //     stream.on("error", error => {
  //         rej(error)
  //     })
  //         .pipe(createWriteStream(toPath).on("pipe", (readable)=>{
  //             readable.on('readable', () => {
  //                 let chunk;
  //                 while (null !== (chunk = readable.read())) {
  //                     console.log(`Read ${chunk.length} bytes of data...`);
  //                 }
  //             });
  //         }))
  //         .on("error", rej)
  //         .on("finish", res)
  // })
  // // по завершении выводит в консоль мета-данные
  // console.log("---------------file written!", imageName, mimetype, encoding)
};
export const deleteUser = async (parent, { password }, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Error("Error signing in");
  }
  const valid = await bcrypt.compare(password, me.password);
  if (!valid) {
    throw new Errors.AuthenticationError("Error password");
  }
  try {
    await models.User.deleteOne({ username: me.username });
    return true;
  } catch (err) {
    return false;
  }
};
