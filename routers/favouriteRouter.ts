import {Request, Response, Router} from "express";
import {FavouriteMovies} from "../utils/repositories/favouriteMoviesRepository/favouriteMovies";


export const favouriteRouter = Router()
    .get('/actor/:user', async (req: Request, res: Response) => {
        const user = req.params.user
        const actorsList = await FavouriteMovies.getFavouriteActors(user)
        res.json(actorsList)

    })
    .get('/:user', async (req: Request, res: Response) => {
        const user = req.params.user
        const moviesList = await FavouriteMovies.getFavouriteMovies(user)
        res.json(moviesList)

    })
    .post('/', async (req: Request, res: Response) => {
        const {id, user, title, image, type} = await req.body;

        try {
            if (type === 'movie') {
                await FavouriteMovies.insertFavouriteMovieIntoDatabase(id, user, title, image)
            }
            if (type === 'actor') {
                await FavouriteMovies.insertFavouriteActorIntoDatabase(id, user, title, image)
            }

            res.json({response: 'ok'})

        } catch (e) {
            res.json(e)

        }

    })
    .delete('/', async (req: Request, res: Response) => {
        try {
            const {id, user, type} = await req.body;
            if (type === 'movie') {
                await FavouriteMovies.deleteMovieFromFavouritesList(id, user)
            }
            if (type === 'actor') {
                await FavouriteMovies.deleteActorFromFavouritesList(id, user)
            }
            res.json({
                response: 'ok',
            })

        } catch (e) {
            res.json(e)

        }


    })

