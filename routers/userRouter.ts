import {Request, Response, Router} from "express";
import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types";
import {sendVerEmail} from "../utils/sendVerificationEmail";
import {ValidationError} from "../utils/handleErrors";
import {noVerifiedAccountsRemover} from "../utils/noVerifiedAccountsRemover";
import {FavouriteMovies} from "../utils/repositories/favouriteMoviesRepository/favouriteMovies";


export const userRouter = Router()

    .post('/', async (req: Request, res: Response) => {

        try {
            const obj = await req.body as UserEntity
            const newUser = new UserRecord(obj)
            const verificationNumber = await newUser.insertIntoDb()
            sendVerEmail(newUser.email, verificationNumber)
            res.json({
                ...newUser,
                passwordhash: '',
            })
        } catch (err) {
            throw new ValidationError(err)
        }
    })
    .post('/:name', async (req: Request, res: Response) => {
        try {
            await noVerifiedAccountsRemover()
            const id = req.params.name
            const password = req.body.pass
            const user = await UserRecord.logIn(id, password) as UserEntity

            if (!user) {
                res.json(null)
            } else {
                if (!user.isverified) {
                    res.json({
                        userNotVerified: true,
                    })
                } else {
                    res.json({
                        ...user,
                        passwordhash: '',
                    })
                }
            }
        } catch (e) {
            throw new ValidationError(e)
        }
    })
    .get('/:id', async (req: Request, res: Response) => {
        try {
            const user = await UserRecord.getOneUser(req.params.id)

            res.json(user)
        } catch (e) {
            throw new ValidationError(e)
        }


    }).put('/change_password/:id', async (req: Request, res: Response) => {
        await UserRecord.changePassword(req.params.id, req.body.password)
        res.json({
            message: 'password changed'
        })
    })

    .put('/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const avatar = req.body.avatar
            await UserRecord.changeAvatar(id, avatar)

        } catch (e) {
            throw new ValidationError(e)
        }
    })
    .delete('/', async (req: Request, res: Response) => {
        try {
            const {userName, userId} = req.body
            await UserRecord.removeAccount(userName, userId)
            await FavouriteMovies.deleteAllFavouriteMoviesAndActors(userName)
            res.json({
                message: `${userName} account was deleted.`
            })
        } catch (e) {
            throw new ValidationError(e)
        }

    })
