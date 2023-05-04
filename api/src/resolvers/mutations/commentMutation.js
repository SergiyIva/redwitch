const {AuthenticationError, ForbiddenError} = require("apollo-server-express")
const mongoose = require("mongoose")

module.exports = {
    newComment:async (parent, {content}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Войди в свой аккаунт сначала!")
        }
        return await models.Comment.create(
            {
                content,
                author:mongoose.Types.ObjectId(user.id)
            }
        )
    },
    newSubComment: async (parent, {id, content}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Войди в свой аккаунт сначала!")
        }
        const comment = await models.Comment.findById(id)
        if(!comment){
            throw new Error("Вы не можете ответить на этот комментарий.")
        }
        await comment.updateOne({$inc: {subCount:1}})
        return await models.Comment.create(
            {
                content,
                author:mongoose.Types.ObjectId(user.id),
                parent:mongoose.Types.ObjectId(id)
            }
        )
    },
    deleteComment:async (parent, {id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Войди в свой аккаунт сначала, а потом удаляй!")
        }
        const comment = await models.Comment.findById(id)
        if (comment && String(comment.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the Comment")
        }
        try {
            if (comment.parent) {
                await models.Comment.updateOne({_id: comment.parent}, {$inc:{subCount: -1}})
            }
            // альтернатива: шаблон проектирования схемы - Дерево (Tree)
            // добавить поле иерархия: ["1род.ид", "2род.ид", "Nрод.ид" ]
            // найти все док-ты в кот. в поле иерархии есть 1род.ид
            const getChild = async (id) => {
                return await models.Comment.find({parent: id},{_id:1})
            }
            let arrTotal = await getChild(mongoose.Types.ObjectId(id))
            // поиск и последующее удаление всех дочерних комментариев
            if(arrTotal.length){
                const findNewChild = async (array) => {
                    let current = []
                    for(let obj of array){
                        let newChild = await getChild(obj._id)
                        if(newChild.length){
                            current = [...current, ...newChild]
                            arrTotal = [...arrTotal, ...newChild]
                        }
                    }
                    if(current.length){
                        await findNewChild(current)
                    }
                }
                await findNewChild(arrTotal)
                arrTotal = arrTotal.map(obj=>obj._id)
                await models.Comment.deleteMany({_id: {$in: arrTotal}})
            }
            await comment.deleteOne()
            return true
        } catch (err) {
            return false
        }

    },
    updateComment:async (parent, {content, id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Войди в свой аккаунт сначала, а потом обновляй!")
        }
        const comment = await models.Comment.findById(id)
        if(!comment) {
            throw new Error("Bad request!")
        }
        if (String(comment.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to update the Comment")
        }
        return models.Comment.findOneAndUpdate(
            {
                _id:id
            },
            {
                $set:{
                    content
                }
            },
            {
                new:true
            }
        );
    },
    toggleLikeOrDislike:async (parent, {id, like}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Войди в свой аккаунт сначала, а потом оценивай!")
        }
        const commentCheck = await models.Comment.findById(id)
        if (like) {
            const hasUserLike = commentCheck.likedBy.indexOf(user.id)
            if (hasUserLike >= 0) {
                return models.Comment.findByIdAndUpdate(
                    id,
                    {
                        $pull:{
                            likedBy:mongoose.Types.ObjectId(user.id)
                        },
                        $inc:{
                            likeCount:-1
                        }
                    },
                    {
                        new:true
                    }
                );
            } else {
                const hasUserDislike = commentCheck.dislikedBy.indexOf(user.id)
                if (hasUserDislike >= 0) {
                    return models.Comment.findByIdAndUpdate(
                        id,
                        {
                            $pull:{
                                dislikedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $push:{
                                likedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $inc:{
                                dislikeCount:-1,
                                likeCount:1
                            }
                        },
                        {
                            new:true
                        }
                    );
                } else {
                    return models.Comment.findByIdAndUpdate(
                        id,
                        {
                            $push:{
                                likedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $inc:{
                                likeCount:1
                            }
                        },
                        {
                            new:true
                        }
                    );
                }
            }
        } else {
            const hasUserDislike = commentCheck.dislikedBy.indexOf(user.id)
            if (hasUserDislike >= 0) {
                return models.Comment.findByIdAndUpdate(
                    id,
                    {
                        $pull:{
                            dislikedBy:mongoose.Types.ObjectId(user.id)
                        },
                        $inc:{
                            dislikeCount:-1
                        }
                    },
                    {
                        new:true
                    }
                );
            } else {
                const hasUserLike = commentCheck.likedBy.indexOf(user.id)
                if (hasUserLike >= 0) {
                    return models.Comment.findByIdAndUpdate(
                        id,
                        {
                            $pull:{
                                likedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $push:{
                                dislikedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $inc:{
                                dislikeCount:1,
                                likeCount:-1
                            }
                        },
                        {
                            new:true
                        }
                    );
                } else {
                    return models.Comment.findByIdAndUpdate(
                        id,
                        {
                            $push:{
                                dislikedBy:mongoose.Types.ObjectId(user.id)
                            },
                            $inc:{
                                dislikeCount:1
                            }
                        },
                        {
                            new:true
                        }
                    );
                }
            }
        }
    }
}