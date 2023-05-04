import getFortune from "./fortune.js";
import multiparty from "multiparty"
import logger from "./importantLog.js"
import {__dirname} from "../../varCJS.js";
import models from "../models/index.js";

export const dataOrder = [
    {
        imgSrc:"finevideo.ru/img/hero-main.png",
        title:"Дизайн",
        describe:"Персональное оформление",
        price:150
    }
]

export const home = () => async (req, res) => {
    const cards = await models.Cardservice.find({available: true}).sort({position: 1})
    const dataCards = cards.map(c=>{return {
            position: c.position,
            name: c.name,
            srcImg: c.srcImg,
            describe: c.describe,
            orderCount: c.orderCount,
            btnOrder: c.btnOrder,
            btnView: c.btnView
    }})
    res.render("home", {cards:dataCards})
}
export const about = () => async (req, res) => {
    const features = await models.Feature.find()
    const dataFeatures = features.map(f=>{
        return {
            title: f.title,
            icon: f.icon,
            description: f.description
        }
    })
    res.render("about", {items:dataFeatures, fortune:getFortune()})
}
export const aboutMain = () => (req, res) => {
    res.render("about/main")
}
export const another = () => (req, res) => {
    res.render("another", {layout:false})
}
export const notFound = () => (req, res) => {
    res.status(404).send("404")
}
export const serverError = () => (err, req, res, next) => {
    console.error('** ОШИБКА СЕРВЕРА: ' + err.message)
    logger("ERROR", {
        handler:"serverError",
        err
    })
    res.status(500).send("error", {message:err.message})
}
export const headers = () => (req, res) => {
    res.type("text/plain")
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join("\n"))
}

export const test = () => (req, res) => {
    getSubscribers()(req,res)
    res.render("jquery-test")
}

export const contact = () => (req, res) => {
    res.render("process-contact", {csrf:"Token CSRF"})
}

export const processContact = () => async (req, res) => {
    const rBody = req.body
    try {
        logger("POST", {
            name:"processContact",
            obj:rBody
        })
        const phone = rBody.phone.replace(/-/g, "")
        const email = rBody.email && rBody.email.toLowerCase().trim()
        console.log('Форма (из строки запроса): ' + req.query.form)
        console.log('Токен CSRF (из скрытого поля формы): ' + rBody._csrf)
        console.log(`Получен контакт от ${rBody.name} <${rBody.phone}> `)
        if (!rBody.name || !rBody.phone || /\D/.test(phone) || phone.length !== 10) {
            req.session.flash = {
                type:"danger",
                intro:"Ошибка проверки!",
                message:"Введенные Вами данные некорректны."
            }
            return res.redirect(303, "/contact-error")
        }
        await models.Callorder.create({
            name: rBody.name,
            phone,
            email,
            subscriber: !!rBody.subscribe,
            describe: rBody.describe
        })
        if (rBody.subscribe) await models.Subscriber.updateOne({},{
            $addToSet: {subscribers: email}
        })
        req.session.flash = {
            type:"success",
            intro:"Спасибо!",
            message:`Ваша заявка принята. ${rBody.subscribe ? "Подписка на рассылку оформлена успешно." : ""}`
        }
        res.redirect(303, "thank-you")
    } catch (e) {
        req.session.flash = {
            type:"danger",
            intro:"Ошибка сервера!",
            message:"Произошла ошибка при обработке заявки."
        }
        console.error(`Ошибка при получении контакта от ${rBody.name} <${rBody.phone}>`)
        res.format({
            "text/html":() => res.redirect(303, "/contact-error"),
            "application/json":() => res.status(500).json({
                error:"ошибка при сохранении контакта"
            })
        })
    }
}
export const thankYou = () => (req, res) => {
    res.render("thank-you")
}

export const contactError = () => (req, res) => {
    res.render("contact-error")
}

export const newOrder = () => (req, res) => {
    const idx = req.params.id
    res.render("new-order", {
        _id:idx,
        csrf:"Token CSRF",
        ...dataOrder[idx],
        total:dataOrder[0].price
    })
}

export const adminMain = () => async (req, res) => {
    const orders = await models.Callorder.find({}).sort({_id: -1}).limit(15)
    const serializedOrders = orders.map(o=>{
        const value = [...o.phone]
        value.splice(3, 0, ")")
        value.splice(7, 0, "-")
        value.splice(10, 0, "-")
        value.unshift("(")
        value.unshift("8")
        const describe = [...o.describe]
        if (describe.length > 15)
        describe.length = 15
        return {
            date: new Date(o.createdAt).toLocaleDateString(),
            name: o.name,
            phone: value.join(""),
            email: o.email,
            describe: describe.join("")
        }
    })

    res.render("admin/main", {layout: "admin", orders: serializedOrders})
}

export const adminProducts = () => async (req, res) => {
    const cards = await models.Cardservice.find().sort({position:1})
    const selects = cards.map(({name, position})=>{return {name, position}})
    res.render("admin/products", {layout: "admin", selects})
}

export const addCard = () => (req, res) => {
    res.render("admin/add-card", {
        layout: "admin",
        csrf:"Token CSRF"
    })
}
export const getCard = () => async (req, res, next) => {
    const idx = req.params.id
    const cardData = await models.Cardservice.findOne({position: idx})
    if (!cardData) next()
    res.render("admin/edit-card", {
        layout: "admin",
        _id: idx,
        csrf:"Token CSRF",
        title: cardData.name,
        slug: String(cardData.slug),
        describe: cardData.describe,
        price: cardData.price,
        tags: cardData.tags.join(", "),
        available: cardData.available
    })
}

const uploadPath = "/img/upload"
export const upsertCard = () => (req, res) => {
    const form = new multiparty.Form({uploadDir:__dirname + "/public"+uploadPath})
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({error:err.message})
        console.log(fields.history)
        if (fields.history[0] === "/admin/add-card")
            processCard(req, res, fields, files, "ADD")
        else if (fields.history[0] === "/admin")
            processCard(req, res, fields, files, "EDIT")
    })
}

const cardValidation = (describe, price) => {
    if (describe.length < 10) {
        return "Введенные Вами данные некорректны. Описание должно быть длиннее 10 символов."
    }
    if (/\D/.test(price)) {
        return "Введенные Вами данные некорректны. Цена должна быть числом."
    }
}

export const processCard = async (req, res, fields, files, type) => {
    const image = files.image && files.image[0]
    console.log(image)
    try {
        const imgPath = image.size ? `${uploadPath}/${image.path.replace(/(.+)\\(.+)$/, "$2")}` : null
        logger("POST", {
            name: type === "ADD"?"addCard":"editCard",
            obj:fields,
            optns:`src ${imgPath}`
        })
        const describe = String(fields.describe)
        const errMsg = cardValidation(describe, String(fields.price))
        if (errMsg){
            req.session.flash = {
                type:"danger",
                intro:"Ошибка проверки!",
                message: errMsg
            }
            return res.redirect(303, `cancel?loc=${fields.history}`)
        }
        console.log('Токен CSRF (из скрытого поля формы): ' + String(fields._csrf))
        const tags = String(fields.tags).replace(/\s/g, "").split(",")
        const newData = {
            name:String(fields.title),
            slug: String(fields.slug),
            describe,
            price: Number(fields.price),
            tags,
            available: !!fields.available
        }
        if (imgPath) newData.srcImg = imgPath
        if (type === "EDIT"){
            console.log(`Изменена услуга ${String(fields.title)}`)
            await models.Cardservice.updateOne({position: fields._id}, {$set:{
                    ...newData
                }})
        } else {
            console.log(`Получена услуга ${String(fields.title)} <${describe}>`)
            const count = await models.Cardservice.find().countDocuments()
            newData.position = count +1
            await models.Cardservice.create(newData)
        }
        res.redirect(303, `success?loc=${fields.history}`)
    } catch (e) {
        console.error(`Ошибка при получении/изменении услуги ${fields.title} `)
        res.format({
            "text/html":() => res.redirect(303, `cancel?loc=${fields.history}`),
            "application/json":() => res.status(500).json({
                error:"ошибка при сохранении услуги"
            })
        })
    }
}

export const addSuccess = () => (req, res) => {
    const loc = req.query.loc
    res.render("admin/success", {
        history:loc
    })
}

export const addCancel = () => (req, res) => {
    const loc = req.query.loc
    res.render("admin/cancel", {
        history:loc
    })
}

export const getSubscribers = () => async (req, res) => {
    const subscribers = await models.Callorder.aggregate([{$match: {subscriber: true}},{$project:{email:1, name:1, _id:0}},{$group: {_id: {email: "$email"}, name: {$addToSet: "$name"}}}])
    console.log(subscribers)
    return subscribers
}

export const sendMailToAllSubs = () => async (req, res) => {
    const subscribers = await models.Callorder.aggregate([{$match: {subscriber: true}},{$project:{email:1, name:1, _id:0}},{$group: {_id: {email: "$email"}, name: {$addToSet: "$name"}}}])
    for (let sub of subscribers)
        console.log(`${sub.name} отправлено письмо на почтовый ящик ${sub._id.email}`)
}

export const sendMailToSome = () => async (req, res) => {
    const recipients = req.body.subscribers

}