import mongoose from "mongoose";

const serverErrorSchema = new mongoose.Schema(
  {
    message: String,
    place: String,
    stack: String,
    addition: String
  },
  {
    timestamps: true
  }
);

const ServerError = mongoose.model("ServerError", serverErrorSchema);
export default ServerError;
