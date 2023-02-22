
export interface UserEntity {
    id?:string,
    name:string,
    email:string,
    passwordhash:string,
    isverified:boolean,
    avatar:number,
    verification_code?:number|null,
    date?:any,


}

