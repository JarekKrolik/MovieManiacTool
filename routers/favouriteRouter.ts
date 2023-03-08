import {Request, Response, Router} from "express";
import {pool} from "../utils/db";
import {ActorsListEntity, MovieListEntity} from "../types";
import {FieldPacket} from "mysql2";


export const favouriteRouter = Router()
    .get('/actor/:user', async (req: Request, res: Response) => {
        const user = req.params.user
        const data = await pool.execute("SELECT * FROM `favourite_actors` WHERE `user`=:user", {
            user: user,
        }) as [ActorsListEntity[], FieldPacket[]]
        res.json(data[0])

    })
    .get('/:user', async (req: Request, res: Response) => {
        const user = req.params.user
        const data = await pool.execute("SELECT * FROM `favourites` WHERE `user`=:user", {
            user: user,
        }) as [MovieListEntity[], FieldPacket[]]
        res.json(data[0])

    })
    .post('/', async (req: Request, res: Response) => {
        const data = await req.body;

        try {
            if (data.type === 'movie') {
                await pool.execute("INSERT INTO `favourites` (`movie_id`,`user`,`name`,`image`) VALUES (:id,:user,:name,:image)", {
                    id: data.id,
                    user: data.user,
                    name: data.title,
                    image: data.image,
                })
            }
            if (data.type === 'actor') {
                await pool.execute("INSERT INTO `favourite_actors` (`actor_id`,`user`,`name`,`image`) VALUES (:id,:user,:name,:image)", {
                    id: data.id,
                    user: data.user,
                    name: data.title,
                    image: data.image,
                })
            }

            res.json({response: 'ok'})

        } catch (e) {
            res.json(e)

        }

    })
    .delete('/', async (req: Request, res: Response) => {
        try {
            const data = await req.body;
            if (data.type === 'movie') {
                await pool.execute(" DELETE FROM `favourites` WHERE `movie_id`=:id AND `user`=:user", {
                    id: data.id,
                    user: data.user,
                })
            }
            if (data.type === 'actor') {
                await pool.execute(" DELETE FROM `favourite_actors` WHERE `actor_id`=:id AND `user`=:user", {
                    id: data.id,
                    user: data.user,
                })
            }
            res.json({
                response: 'ok',
            })

        } catch (e) {
            res.json(e)

        }


    })

