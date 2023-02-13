import {Request, Response, Router} from "express";
import {MovieFinder} from "../repository/MovieFinder";

export const userRouter = Router()
    .get('/:id',async (req:Request,res:Response)=>{
        const id = await req.body.params;

        res.json({ok:'ok'})
    })
