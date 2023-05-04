import mongoose from "mongoose"

const callorderSchema = new mongoose.Schema({
        name:String,
        phone:{
            type:String,
            index:{unique:false}
        },
        email:String,
        subscriber: {
            type: Boolean,
            default: false
        },
        describe: String
    },{
    timestamps: true
    }
)

const Callorder = mongoose.model("Callorder", callorderSchema)
export default Callorder