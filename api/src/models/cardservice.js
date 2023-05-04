import mongoose from "mongoose";

const cardserviceSchema = new mongoose.Schema(
  {
    position: {
      type: Number,
      default: 0
    },
    available: Boolean,
    sku: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    name: {
      type: String,
      required: true
    },
    srcImg: String,
    slug: String,
    describe: String,
    price: Number,
    tags: [String],
    orderCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamp: true
  }
);

const Cardservice = mongoose.model("Cardservice", cardserviceSchema);
export default Cardservice;
