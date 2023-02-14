import {Request, Response, Router} from "express";
import {pool} from "../utils/db";
import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types";


export const userRouter = Router()
    .post('/:name',async (req:Request,res:Response)=>{
const id = req.params.name;
const password = req.body.password;
const user = await UserRecord.logIn(id,password)
        console.log(user)
user?res.json(user):res.json(null)

    }).post('/', async (req:Request,res:Response)=>{

 const obj = await req.body as UserEntity
 const newUser = new UserRecord(obj);
 const resp =   await newUser.insertIntoDb()
 res.json({ok:'ok'})




    })
