import mongoose from "mongoose"

const CiteSchema = new mongoose.Schema(
    {
        content: {
            type: String
        },
        random:{
            type: Number
        }
    }
)

const Cite = mongoose.model("Cite", CiteSchema)
export default Cite