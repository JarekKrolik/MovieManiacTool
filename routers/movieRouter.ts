import {Request, Response, Router} from "express";
import {MovieFinder} from "../repository/MovieFinder";

export const movieRouter = Router()
    .get('/',async (req:Request,res:Response)=>{

await MovieFinder.getAllByTitle('terminator');
await MovieFinder.getComingSoonMovies();
res.json({ok:'ok'})
    })
