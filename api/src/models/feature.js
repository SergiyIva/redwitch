import mongoose from "mongoose"

const featureSchema = new mongoose.Schema({
        title: String,
        icon: String,
        description: String
    }
)

const Feature = mongoose.model("Feature", featureSchema)
export default Feature