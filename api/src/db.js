import mongoose from "mongoose"

const db = {
    connect: DB_HOST => {
        mongoose.connect(DB_HOST)
        mongoose.connection.on("error", err => {
            console.error(err)
            console.log("MongoDB connection error. Давай запусти Монго, ЭЙ!")
            process.exit()
        })
    },
        close: () => {
    mongoose.connection.close()
}
}

export default db