import {UserEntity} from "../types/movieTypes/user.type";
import{v4}from 'uuid'
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {compare, hash} from "bcrypt";
export class UserRecord implements UserEntity {
    email: string;
    id?: string;
    name: string;
    passwordhash: string;
    avatar: number;



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



    }
async insertIntoDb ():Promise<string>{

 const hashPassword = await hash(this.passwordhash,10)

    await pool.execute("INSERT INTO `userslist`(`id`, `name`, `passwordhash`, `email`,`avatar`) VALUES (:id,:name,:passwordhash,:email,:avatar)",{
        id:this.id,
        name:this.name,
        passwordhash:hashPassword,
        email:this.email,
        avatar:this.avatar,
    })

return this.id;

}

static async logIn (userName:string,password:string):Promise<UserEntity>{


        const [result]= await pool.execute("SELECT * FROM `userslist` WHERE `name`=:userName",{
            userName:userName,

        }) as [UserEntity[],FieldPacket[]]

          const check = await compare(password,result[0].passwordhash)

          return check?result[0]:null
}






}