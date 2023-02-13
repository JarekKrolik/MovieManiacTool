import {MovieEntity} from "../types";
import fetch from 'cross-fetch';

export class MovieFinder  implements MovieEntity {

    description: string;
    id: string;
    image: string;
    resultType: string;
    title: string;

    static async getAllByTitle (title:string,lang='en'):Promise<MovieEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchMovie/k_9gtvw9rs/${title}`);
        const data = await res.json() as MovieEntity[];


        // console.log(data)


        return data;
};

    static async getComingSoonMovies():Promise<[]>{
        const res = await fetch(`https://imdb-api.com/en/API/ComingSoon/k_9gtvw9rs`);
        const data = await res.json() ;

        console.log(data)
        return data;
    }

    static async nowInCinemas():Promise<[]>{
        const res = await fetch(`https://imdb-api.com/en/API/InTheaters/k_9gtvw9rs`);
        const data = await res.json() ;

        console.log(data)
        return data;
    }


}