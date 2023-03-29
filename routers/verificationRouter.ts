import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {UserVerification} from "../utils/repositories/verificationRepository/userVerification";


export const verificationRouter = Router()
    .post('/reset', async (req: Request, res: Response) => {
        try {
            const {name, email} = req.body
            await UserVerification.resetUserPassword(name, email)
            res.json({response: 'New password was sent on your e-mail'})
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/:name', async (req: Request, res: Response) => {
        const name = req.params.name
        const code = Number(req.body.code)
        const userCode = await UserVerification.userVerification(name)


        if (code !== userCode) {
            res.json({
                verificationOk: false,
            })
        } else {
            await UserVerification.verifyUserAccount()
            res.json({
                verificationOk: true,
            })
        }
    })