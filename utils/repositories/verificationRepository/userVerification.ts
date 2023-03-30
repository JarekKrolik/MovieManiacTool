import {UserRecord} from "../../../records/user.record";
import {hash} from "bcrypt";
import {pool} from "../../db";
import {sendNewPasswordEmail} from "../../sendNewPasswordEmail";
import {UserEntity} from "../../../types";
import {FieldPacket} from "mysql2";

export class UserVerification {

    static async verifyUserAccount() {
        await pool.execute("UPDATE `userslist` SET `isverified` = '1'")
    }

    static async userVerification(name: string) {
        const user = await pool.execute("SELECT * FROM `userslist` WHERE `name`=:name", {
            name: name,
        }) as [UserEntity[], FieldPacket[]];

        return user[0][0].verification_code
    }

    static async resetUserPassword(name: string, email: string) {
        const newPassword = await UserRecord.resetPassword()
        const hashPassword = await hash(newPassword, 10)

        await pool.execute("UPDATE `userslist` SET `passwordhash`=:password WHERE `name`=:name AND `email`=:email", {
            password: hashPassword,
            name,
            email,
        })
        await sendNewPasswordEmail(email, newPassword)
    }
}