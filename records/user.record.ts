import {UserEntity} from "../types/movieTypes/user.type";
import{v4}from 'uuid'
import {ValidationError} from "../utils/handleErrors";
export class UserRecord implements UserEntity {
    email: string;
    id?: string;
    name: string;
    passwordHash: string;


    constructor(obj: UserEntity) {
        if(!obj.id){obj.id=v4()};
        if(obj.name.length<3){throw new ValidationError('name should be at least 3 characters long !')}
        if(obj.email.indexOf('@')<0){throw new ValidationError('invalid email adress  !')}
        if(!obj.passwordHash||obj.passwordHash.length<6){throw new ValidationError('invalid or to short password  !')}



        this.email=obj.email,
            this.id=obj.id,
            this.name=obj.name,
            this.passwordHash=obj.passwordHash


    }




    static async getUserById(id:string){

    }


}