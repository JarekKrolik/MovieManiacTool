import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4} from 'uuid';
import {AnswersResponse, AnswerToComment, CommentsEntity, CommentsResponse, DislikeEntity, LikeEntity} from "../types";


export const commentsRouter = Router()
    .delete('/likes', async (req: Request, res: Response) => {
        try {
            const {commentId, user} = req.body;
            const id = v4()
            const data = await pool.execute("SELECT `disliked_id`, `user` FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
                user,
                commentId,
            }) as [DislikeEntity[], FieldPacket[]]
            if (data[0].length === 0) {
                const isAlreadyLiked = await pool.execute("SELECT * FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
                    user,
                    commentId,
                }) as [LikeEntity[], FieldPacket[]]
                if (isAlreadyLiked[0].length > 0) {
                    pool.execute("DELETE FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
                        user,
                        commentId,
                    })
                    let likesNumber = await pool.execute("SELECT  `liked` FROM `comments` WHERE `id`=:commentId", {
                        commentId,
                    }) as [CommentsEntity[], FieldPacket[]]
                    const newLikesNumber = --likesNumber[0][0].liked
                    await pool.execute("UPDATE `comments` SET `liked`=:number WHERE `id`=:id", {
                        id: commentId,
                        number: newLikesNumber,
                    })

                }
                await pool.execute("INSERT INTO `comments_dislikes`(`id`, `disliked_id`, `user`) VALUES (:id,:disliked_id,:user)", {
                    id,
                    disliked_id: commentId,
                    user,
                })

                let disLikesNumber = await pool.execute("SELECT  `disliked` FROM `comments` WHERE `id`=:commentId", {
                    commentId,
                }) as [CommentsEntity[], FieldPacket[]]
                const newDislikesNumber = ++disLikesNumber[0][0].disliked
                await pool.execute("UPDATE `comments` SET `disliked`=:number WHERE `id`=:id", {
                    id: commentId,
                    number: newDislikesNumber,
                })
                res.json({
                    message: 'dislike added'
                })


            } else {
                res.json({
                    message: 'comment already disliked'
                })
            }
        } catch (e) {
            throw new ValidationError(e)

        }


    })
    .post('/likes', async (req: Request, res: Response) => {
        try {
            const {commentId, user} = req.body;
            const id = v4()
            const data = await pool.execute("SELECT `liked_id`, `user` FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
                user,
                commentId,
            }) as [LikeEntity[], FieldPacket[]]

            if (data[0].length === 0) {
                const isAlreadyDisliked = await pool.execute("SELECT * FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
                    user,
                    commentId,
                }) as [DislikeEntity[], FieldPacket[]]
                if (isAlreadyDisliked[0].length > 0) {
                    pool.execute("DELETE FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
                        user,
                        commentId,
                    })
                    let dislikesNumber = await pool.execute("SELECT  `disliked` FROM `comments` WHERE `id`=:commentId", {
                        commentId,
                    }) as [CommentsEntity[], FieldPacket[]]
                    const newDislikesNumber = --dislikesNumber[0][0].disliked
                    await pool.execute("UPDATE `comments` SET `disliked`=:number WHERE `id`=:id", {
                        id: commentId,
                        number: newDislikesNumber
                    })

                }
                await pool.execute("INSERT INTO `comments_likes`(`id`, `liked_id`, `user`) VALUES (:id,:liked_id,:user)", {
                    id,
                    liked_id: commentId,
                    user,
                })

                let likesNumber = await pool.execute("SELECT  `liked` FROM `comments` WHERE `id`=:commentId", {
                    commentId,
                }) as [CommentsEntity[], FieldPacket[]]
                const newLikesNumber = ++likesNumber[0][0].liked
                await pool.execute("UPDATE `comments` SET `liked`=:number WHERE `id`=:id", {
                    id: commentId,
                    number: newLikesNumber,
                })


                res.json({
                    message: 'like added'
                })
            } else {
                res.json({
                    message: 'already liked this comment'
                })
            }
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/answers', async (req: Request, res: Response) => {
        try {
            const {mainCommentId, comment, user, avatar} = req.body
            const newId = v4()
            await pool.execute("INSERT INTO `comments_answers`(`id`, `comment_id`, `comment`,  `user`, `avatar`) VALUES (:id,:mainCommentId,:comment,:user,:avatar)", {
                id: newId,
                mainCommentId,
                comment,
                user,
                avatar,

            })
            res.json({message: 'answer to comment added'})

        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .put('/answers/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const {comment} = req.body;
            await pool.execute("UPDATE `comments_answers` SET `comment`=:comment WHERE `id`=:id", {
                id,
                comment,
            })
            res.json({
                message: 'answer to comment updated',
            })
        } catch (e) {
            throw new ValidationError(e)

        }


    })
    .get('/answers/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const response = await pool.execute("SELECT * FROM `comments_answers` WHERE `comment_id` = :id", {
                id,
            }) as [AnswerToComment[], FieldPacket[]]
            const data = {
                result: response[0],
                message: 'comments loaded'
            } as AnswersResponse
            res.json(data)
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .get('/:id/:type', async (req: Request, res: Response) => {
        try {
            const data = await pool.execute("SELECT `name`, `comment`, `created_at`,`id`, `avatar`,`liked`,`disliked` FROM `comments` WHERE `commented_id`=:id AND `type`=:type ORDER BY `created_at` ASC ", {
                id: req.params.id,
                type: req.params.type,
            }) as [CommentsEntity[], FieldPacket[]];
            const response = {
                message: 'ok',
                result: data[0],
            } as CommentsResponse
            res.json(response)

        } catch (e) {
            res.json({
                message: e,
                result: [],
            })
        }


    })
    .delete('/answers', async (req: Request, res: Response) => {
        try {
            const {id} = req.body
            await pool.execute("DELETE FROM `comments_answers` WHERE `id`=:id", {
                id,
            })
            res.json({
                message: 'answer to comment deleted'
            })
        } catch (e) {
            throw new ValidationError(e)
        }

    })
    .delete('/', async (req: Request, res: Response) => {

        try {
            const id = req.body.id;
            await pool.execute("DELETE FROM `comments` WHERE `id`=:id", {
                id: id,
            })

            res.json({
                message: 'comment deleted...',
            })

        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/', async (req: Request, res: Response) => {
            try {
                const data = await req.body;
                const id = v4();
                if (data.comment === ' ' || data.comment === '') {
                    res.json({
                        message: 'empty comment'
                    })
                } else {
                    await pool.execute("INSERT INTO `comments`(`id`, `commented_id`, `name`, `comment`, `avatar`, `type`) VALUES (:id,:commented_id,:name,:comment,:avatar,:type)", {
                        id: id,
                        commented_id: data.commented_id,
                        name: data.name,
                        comment: data.comment,
                        avatar: data.avatar,
                        type: data.type,
                    })

                    res.json({
                        message: 'comment added...',
                    })
                }

            } catch (e) {
                throw new ValidationError(e)
            }
        }
    )
    .put('/', async (req: Request, res: Response) => {
        try {
            const {id, newComment} = req.body
            if (!newComment || newComment === ' ') {
                res.json({message: 'comment is empty !'})
            } else {
                await pool.execute("UPDATE `comments` SET `comment`=:newComment,`created_at`=:date WHERE `id`=:id", {
                    id,
                    newComment,
                    date: new Date(),
                })
                res.json({message: 'comment updated'})
            }
        } catch (e) {
            throw new ValidationError(e)
        }


    })
