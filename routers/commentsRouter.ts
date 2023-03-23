import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4} from 'uuid';
import {AnswersResponse, AnswerToComment, CommentsEntity, CommentsResponse} from "../types";


export const commentsRouter = Router()
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
            const data = await pool.execute("SELECT `name`, `comment`, `created_at`,`id`, `avatar` FROM `comments` WHERE `commented_id`=:id AND `type`=:type ORDER BY `created_at` ASC ", {
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
