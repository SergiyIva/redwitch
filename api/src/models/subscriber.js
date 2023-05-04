import mongoose from "mongoose"

const subscriberSchema = new mongoose.Schema({
        subscribers: [String]
    }
)

const Subscriber = mongoose.model("Subscriber", subscriberSchema)
export default Subscriber