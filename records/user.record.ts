import {UserEntity} from "../types/movieTypes/user.type";
import {v4} from 'uuid'
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {compare, hash} from "bcrypt";
import {generate} from 'generate-password'

export class UserRecord implements UserEntity {
    email: string;
    id?: string;
    name: string;
    passwordhash: string;
    avatar: number;
    verification_code?: number | null;
    isverified: false;
    date?: any;


    constructor(obj: UserEntity) {
        if (!obj.id) {
            obj.id = v4()
        }
        ;
        if (obj.name.length < 3 || obj.name.length > 10) {
            throw new ValidationError('name should be between 3 and 10 characters')
        }
        if (obj.email.indexOf('@') < 0) {
            throw new ValidationError('invalid email adress  !')
        }
        if (!obj.passwordhash || obj.passwordhash.length < 6) {
            throw new ValidationError('invalid or to short password  !')
        }


        this.isverified = false;
        this.avatar = obj.avatar;
        this.email = obj.email;
        this.id = obj.id;
        this.name = obj.name;
        this.passwordhash = obj.passwordhash;
        this.verification_code = null;


    }

    static async resetPassword(): Promise<string> {
        return generate({
    length: 10,
    numbers: true
})
    }

    static async changeAvatar(id: string, avatar: number): Promise<void> {
        try {
            await pool.execute("UPDATE `userslist` SET `avatar`=:avatar WHERE `id`=:id", {
                    avatar: String(avatar),
                    id: id,
                }
            );
        } catch (e) {
            throw new ValidationError(e)
        }


    }

    static async getOneUser(id: string): Promise<UserEntity[]> {
        const user = await pool.execute("SELECT * FROM `userslist` WHERE `id`=:id", {
            id: id,
        }) as [UserEntity[], FieldPacket[]]

        return user[0]
    }

    async insertIntoDb(): Promise<number> {
        const verificationCode = Math.floor(Math.random() * (9999 - 8000) + 1999)

        const hashPassword = await hash(this.passwordhash, 10)

        await pool.execute("INSERT INTO `userslist`(`id`, `name`, `passwordhash`, `email`,`avatar`,`verification_code`) VALUES (:id,:name,:passwordhash,:email,:avatar,:verificationCode)", {
            id: this.id,
            name: this.name,
            passwordhash: hashPassword,
            email: this.email,
            avatar: this.avatar,
            verificationCode: verificationCode,
        })

        return verificationCode;

    }

    static async logIn(userName: string, password: string): Promise<UserEntity> {


        const [result] = await pool.execute("SELECT * FROM `userslist` WHERE `name`=:userName", {
            userName: userName,

        }) as [UserEntity[], FieldPacket[]]

        if (!result[0]) {
            return null
        }
        const check = await compare(password, result[0].passwordhash)
        if (check) {
            if (result[0].name === userName) {
                return result[0]
            } else return null


        } else return null
    }


}