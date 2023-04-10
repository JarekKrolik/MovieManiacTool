import {pool} from "./db";
import {UserEntity} from "../types";
import {FieldPacket} from "mysql2";

export const noVerifiedAccountsRemover = async () => {
    const result = await pool.execute("SELECT * FROM `userslist` WHERE `isverified`=0") as [UserEntity[], FieldPacket[]]
    const now = new Date().getTime()

    const notVerifiedUsersLongerThanWeek = result[0].map(user => {
        if (now - user.date.getTime() > 604800000) {
            return user.id
        } else {
            return null
        }
    })

    await notVerifiedUsersLongerThanWeek.forEach(user => {
        if (user) {
            pool.execute("DELETE FROM `userslist` WHERE `id`=:id", {
                id: user,
            })
        }
    })


}