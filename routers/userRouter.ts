import {Request, Response, Router} from "express";
import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types";
import {sendVerEmail} from "../utils/sendVerificationEmail";


export const userRouter = Router()
    .post('/:name',async (req:Request,res:Response)=>{
                      const id = req.params.name;
                      const password = req.body.password;
                      const user = await UserRecord.logIn(id,password)
                      user?res.json(user):res.json(null)

    }).post('/', async (req:Request,res:Response)=>{

                      const obj = await req.body as UserEntity
                      const newUser = new UserRecord(obj);
                      const resp =   await newUser.insertIntoDb()

                      // await sendVerEmail(newUser.email,newUser.id)
                      res.json(newUser)

    })
