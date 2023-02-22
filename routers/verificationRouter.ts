import {Request, Response, Router} from "express";
import {UserRecord} from "../records/user.record";
import {UserEntity} from "../types";
import {sendVerEmail} from "../utils/sendVerificationEmail";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


export const verificationRouter = Router()
     .post('/:name',async (req:Request,res:Response)=>{
          const name = req.params.name;
          const code = Number(req.body.code);
          const user = await pool.execute("SELECT * FROM `userslist` WHERE `name`=:name",{
         name:name,
     }) as   [UserEntity[],FieldPacket[]];



          if(code!==user[0][0].verification_code){
              res.json({
                  verificationOk:false,
              })
          }else {
              await pool.execute("UPDATE `userslist` SET `isverified` = '1'")


              res.json({
                  verificationOk:true,
              })
          }
     })