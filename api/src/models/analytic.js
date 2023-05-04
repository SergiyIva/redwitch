import mongoose from "mongoose";

const AnalyticSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  visitedAt: {
    type: Date,
    required: true
  },
  clientId: {
    type: String,
    required: true,
    index: true
  }
});

const Analytic = mongoose.model("Analytic", AnalyticSchema);
export default Analytic;
