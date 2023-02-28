import {Request, Response, Router} from "express";
import {pool} from "../utils/db";
import {MovieListEntity} from "../types";
import {FieldPacket} from "mysql2";


export const favouriteRouter = Router()
    .get('/:user',async (req:Request,res:Response)=>{
        const user = req.params.user
        const data = await pool.execute("SELECT * FROM `favourites` WHERE `user`=:user",{
            user:user,
        }) as [MovieListEntity[],FieldPacket[]]

        res.json(data[0])
        console.log(data[0])


    })
    .post('/',async (req:Request,res:Response)=>{
        const data = await req.body;


if(data.type==='movie'){
    await pool.execute("INSERT INTO `favourites` (`movie_id`,`user`) VALUES (:id,:user)",{
        id:data.id,
        user:data.user,


    })
}
    })
    .delete('/',async (req:Request,res:Response)=>{
        try{
        const data =await req.body;
        if(data.type==='movie'){
          await pool.execute(" DELETE FROM `favourites` WHERE `movie_id`=:id AND `user`=:user",{
              id:data.id,
              user:data.user,
          })
        }}catch (e) {
            res.json(e)
            throw new Error(e)
        }






    })

