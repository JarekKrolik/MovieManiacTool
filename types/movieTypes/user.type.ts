
export interface UserEntity {
    id?:string,
    name:string,
    email:string,
    passwordHash:string,
    isVerified?:boolean,
    avatar:number,


}