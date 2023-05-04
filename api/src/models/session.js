import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    index: true
  },
  platform: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  clientId: {
    type: String,
    required: true,
    index: true
  },
  visitCount: {
    type: Number,
    default: 0
  },
  orderedCount: {
    type: Number,
    default: 0
  }
});

const Session = mongoose.model("Session", SessionSchema);
export default Session;
