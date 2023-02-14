import {UserEntity} from "../types/movieTypes/user.type";
import{v4}from 'uuid'
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
export class UserRecord implements UserEntity {
    email: string;
    id?: string;
    name: string;
    passwordHash: string;
    avatar: number;



    constructor(obj: UserEntity) {
        if(!obj.id){obj.id=v4()};
        if(obj.name.length<3){throw new ValidationError('name should be at least 3 characters long !')}
        if(obj.email.indexOf('@')<0){throw new ValidationError('invalid email adress  !')}
        if(!obj.passwordHash||obj.passwordHash.length<6){throw new ValidationError('invalid or to short password  !')}


this.avatar=obj.avatar,
        this.email=obj.email,
            this.id=obj.id,
            this.name=obj.name,
            this.passwordHash=obj.passwordHash


    }

async insertIntoDb ():Promise<string>{



    await pool.execute("INSERT INTO `users`(`id`, `name`, `passwordhash`, `email`,`avatar`) VALUES (:id,:name,:passwordHash,:email,:avatar)",{
        id:this.id,
        name:this.name,
        passwordHash:this.passwordHash,
        email:this.email,
        avatar:this.avatar,
    })

return this.id;

}

static async logIn (userName:string,password:string):Promise<UserEntity>{
        const [result]= await pool.execute("SELECT * FROM `users` WHERE `id`=:userName AND `passwordhash`=:password",{
            userName:userName,
            password:password,
        }) as [UserEntity[],FieldPacket[]]


        return result[0]?result[0]:null
}






}