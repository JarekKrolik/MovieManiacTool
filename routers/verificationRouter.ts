import {Request, Response, Router} from "express";
import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types";
import {sendVerEmail} from "../utils/sendVerificationEmail";


export const verificationRouter = Router()
     .post('/:id',async (req:Request,res:Response)=>{
         const id = req.params.id;

console.log(id)

     })