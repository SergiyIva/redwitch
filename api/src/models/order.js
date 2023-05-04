import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      index: { unique: true }
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cardservice"
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      index: { unique: false }
    },
    email: {
      type: String,
      required: true
    },
    subscriber: {
      type: Boolean,
      default: false
    },
    description: String,
    clientId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "accepted"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
