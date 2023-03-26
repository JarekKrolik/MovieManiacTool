import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4} from 'uuid';
import {AnswersResponse, AnswerToComment, CommentsEntity, CommentsResponse} from "../types";
import {CommentsRepository} from "../utils/repositories/commentsRepository/commentsRepository";


export const commentsRouter = Router()
    .delete('/likes', async (req: Request, res: Response) => {
        try {
            const {commentId, user, type} = req.body;
            const id = v4()
            const dislikesList = await CommentsRepository.getDislikes(user, commentId)
            if (dislikesList.length === 0) {
                const likesList = await CommentsRepository.getLikes(user, commentId)
                if (likesList.length > 0) {
                    await CommentsRepository.deleteLike(user, commentId)

                    if (type === 'comment') {
                        const likesNumber = await CommentsRepository.getLikesCountFromComment(commentId, type)
                        const newLikesNumber = --likesNumber.liked
                        await CommentsRepository.updateLikesCountInComment(commentId, newLikesNumber, type)
                    }

                    if (type === 'answer') {
                        const likesNumber = await CommentsRepository.getLikesCountFromComment(commentId, type)
                        const newLikesNumber = --likesNumber.liked
                        await CommentsRepository.updateLikesCountInComment(commentId, newLikesNumber, type)
                    }
                }

                await CommentsRepository.insertDislikeIntoDatabase(id, commentId, user)

                if (type === 'comment') {
                    const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                    const newDislikesNumber = ++dislikesCount.disliked
                    await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                }

                if (type === 'answer') {
                    const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                    const newDislikesNumber = ++dislikesCount.disliked
                    await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                }

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
            const {commentId, user, type} = req.body;
            const id = v4()
            const likesList = await CommentsRepository.getLikes(user, commentId)

            if (likesList.length === 0) {
                const dislikesList = await CommentsRepository.getDislikes(user, commentId)
                if (dislikesList.length > 0) {
                    await CommentsRepository.deleteDislike(user, commentId)

                    if (type === 'comment') {
                        const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                        const newDislikesNumber = --dislikesCount.disliked
                        await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                    }

                    if (type === 'answer') {
                        const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                        const newDislikesNumber = --dislikesCount.disliked
                        await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                    }
                }

                await CommentsRepository.insertLikeIntoDatabase(id, commentId, user)

                if (type === 'comment') {
                    const likesCount = await CommentsRepository.getLikesCountFromComment(commentId, type)
                    const newLikesCount = ++likesCount.liked
                    await CommentsRepository.updateLikesCountInComment(commentId, newLikesCount, type)

                }
                if (type === 'answer') {
                    const likesCount = await CommentsRepository.getLikesCountFromComment(commentId, type)
                    const newLikesCount = ++likesCount.liked
                    await CommentsRepository.updateLikesCountInComment(commentId, newLikesCount, type)
                }
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
            await CommentsRepository.addAnswerToComment(newId, mainCommentId, comment, user, avatar)
            res.json({message: 'answer to comment added'})
        } catch (e) {
            throw new ValidationError(e)
        }

    })
    .put('/answers/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const {comment} = req.body;
            await CommentsRepository.updateAnswerToComment(id, comment)
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
            await pool.execute("DELETE FROM `comments_likes` WHERE `liked_id`=:id", {
                id,
            })
            await pool.execute("DELETE FROM `comments_dislikes` WHERE `disliked_id`=:id", {
                id,
            })
            await pool.execute("DELETE FROM `comments_answers` WHERE `comment_id`=:id", {
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

            await pool.execute("DELETE FROM `comments_likes` WHERE `liked_id`=:id", {
                id,
            })
            await pool.execute("DELETE FROM `comments_dislikes` WHERE `disliked_id`=:id", {
                id,
            })
            await pool.execute("DELETE FROM `comments_answers` WHERE `comment_id`=:id", {
                id,
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
