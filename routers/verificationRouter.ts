import {Request, Response, Router} from "express";
import {UserEntity} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {UserRecord} from "../records/user.record";
import {hash} from "bcrypt";
import {sendNewPasswordEmail} from "../utils/sendNewPasswordEmail";
import {ValidationError} from "../utils/handleErrors";


export const verificationRouter = Router()
    .post('/reset', async (req: Request, res: Response) => {
        try {
            const newPassword = await UserRecord.resetPassword()
            const hashPassword = await hash(newPassword, 10)

            await pool.execute("UPDATE `userslist` SET `passwordhash`=:password WHERE `name`=:name AND `email`=:email", {
                password: hashPassword,
                name: req.body.user,
                email: req.body.email,
            })
            await sendNewPasswordEmail(req.body.email, newPassword)
            res.json({response: 'New password was sent on your e-mail'})
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/:name', async (req: Request, res: Response) => {
        const name = req.params.name;
        const code = Number(req.body.code);
        const user = await pool.execute("SELECT * FROM `userslist` WHERE `name`=:name", {
            name: name,
        }) as [UserEntity[], FieldPacket[]];


        if (code !== user[0][0].verification_code) {
            res.json({
                verificationOk: false,
            })
        } else {
            await pool.execute("UPDATE `userslist` SET `isverified` = '1'")


            res.json({
                verificationOk: true,
            })
        }
    })