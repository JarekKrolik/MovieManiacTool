import {UserEntity} from "../types/movieTypes/user.type";
import{v4}from 'uuid'
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {compare, hash} from "bcrypt";
import {match} from "assert";
export class UserRecord implements UserEntity {
    email: string;
    id?: string;
    name: string;
    passwordhash: string;
    avatar: number;
    verificationNumber?:number|null



    constructor(obj: UserEntity) {
        if(!obj.id){obj.id=v4()};
        if(obj.name.length<3){throw new ValidationError('name should be at least 3 characters long !')}
        if(obj.email.indexOf('@')<0){throw new ValidationError('invalid email adress  !')}
        if(!obj.passwordhash||obj.passwordhash.length<6){throw new ValidationError('invalid or to short password  !')}



            this.avatar=obj.avatar;
            this.email=obj.email;
            this.id=obj.id;
            this.name=obj.name;
            this.passwordhash = obj.passwordhash;
            this.verificationNumber=null;


    }
async insertIntoDb ():Promise<number>{
 const verificationCode = Math.floor(Math.random()*(9999-8000)+1999)

 const hashPassword = await hash(this.passwordhash,10)

    await pool.execute("INSERT INTO `userslist`(`id`, `name`, `passwordhash`, `email`,`avatar`,`verification_code`) VALUES (:id,:name,:passwordhash,:email,:avatar,:verificationCode)",{
        id:this.id,
        name:this.name,
        passwordhash:hashPassword,
        email:this.email,
        avatar:this.avatar,
        verificationCode:verificationCode,
    })

return verificationCode;

}

static async logIn (userName:string,password:string):Promise<UserEntity>{


        const [result]= await pool.execute("SELECT * FROM `userslist` WHERE `name`=:userName",{
            userName:userName,

        }) as [UserEntity[],FieldPacket[]]

          const check = await compare(password,result[0].passwordhash)

          return check?result[0]:null
}






}