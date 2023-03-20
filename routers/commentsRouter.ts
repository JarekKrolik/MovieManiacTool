import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4} from 'uuid';
import {CommentsEntity, CommentsResponse} from "../types";


export const commentsRouter = Router()
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
                if (data.comment === '') {
                    res.json({
                        message: 'empty comment'
                    })
                }
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

            } catch (e) {
                throw new ValidationError(e)
            }
        }
    )
    .put('/', async (req: Request, res: Response) => {
        try {
            const {id, newComment} = req.body
            await pool.execute("UPDATE `comments` SET `comment`=:newComment,`created_at`=:date WHERE `id`=:id", {
                id,
                newComment,
                date: new Date().toLocaleString()
            })
            res.json({message: 'comment updated'})
        } catch (e) {
            throw new ValidationError(e)
        }


    })
