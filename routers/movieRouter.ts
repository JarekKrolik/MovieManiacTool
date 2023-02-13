import {Request, Response, Router} from "express";
import {MovieFinder} from "../repository/MovieFinder";

export const movieRouter = Router()
    .get('/',async (req:Request,res:Response)=>{
//
// await MovieFinder.getAllByTitle('dom zły 2009','en');
// await MovieFinder.getComingSoonMovies();
// await MovieFinder.nowInCinemas('pl');
//         await MovieFinder.getOneMovieById('tt1485698','pl')

// await MovieFinder.findActorByName('arnold schwarzenegger')
        await MovieFinder.findActorById('nm0000216')
res.json({ok:'ok'})
    })
