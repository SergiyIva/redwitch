import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    // 5 - базовый
    // 4 - возможность скрыть инфу
    // 3 - удаление инфы, добавление
    // 2 - просмотр статистики, все привилегии
    // 1 - полный контроль
    // admin - moderator - operator - user
    access: {
      level: {
        type: Number,
        default: 5
      },
      group: [
        {
          type: String,
          default: "user"
        }
      ]
    },
    clientId: [String],
    info: {
      firstName: {
        type: String
      },
      secondName: {
        type: String
      },
      city: {
        type: String
      },
      workPlace: {
        type: String
      },
      birthday: {
        type: Date
      },
      skills: [
        {
          type: String
        }
      ],
      hobbies: [
        {
          type: String
        }
      ],
      contacts: [
        {
          name: {
            type: String
          },
          value: {
            type: String
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
