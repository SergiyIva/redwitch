import {dataOrder} from "./handlers.js"

const dataPromo = {
    PROJECTX: 0.05
}

export const checkPromocode = () => (req, res) => {
    const request = req.body
    if (request.promocode in dataPromo) {
        const sale = dataPromo[request.promocode]*dataOrder[request._id].price
        res.send({
            result:"success",
            code:request.promocode,
            sale,
            total: dataOrder[request._id].price - sale
        })
    }
    else res.send({
        result: "cancel"
    })
}