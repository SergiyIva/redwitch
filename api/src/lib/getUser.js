import jwt from "jsonwebtoken"

const getUser = (token) => {
    if (token){
        try {
            //console.log(token)
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            new Error("Ошибка сессии")
        }
    }
}

export default getUser