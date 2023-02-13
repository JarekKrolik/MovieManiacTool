import {MovieEntity} from "../types";
import fetch from 'cross-fetch';
import {imdbApiKey} from "../utils/config/apiKeyConfig";

export class MovieFinder  implements MovieEntity {

    description: string;
    id: string;
    image: string;
    resultType: string;
    title: string;

    static async getAllByTitle (title:string,lang='en'):Promise<MovieEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchMovie/${imdbApiKey}/${title}`);
        const data = await res.json() as MovieEntity[];


        // console.log(data)


        return data;
};

    static async getAllSeriesByTitle (title:string,lang='en'):Promise<MovieEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchSeries/${imdbApiKey}/${title}`);
        const data = await res.json() as MovieEntity[];


        // console.log(data)


        return data;
    };

    static async getComingSoonMovies(lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/ComingSoon/${imdbApiKey}`);
        const data = await res.json() ;

        // console.log(data)
        return data;
    }

    static async nowInCinemas(lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/InTheaters/${imdbApiKey}`);
        const data = await res.json() ;

        // console.log(data)
        return data;
    }

static async getOneMovieById(id:string,lang='en'):Promise<MovieEntity>{
    const res = await fetch(`https://imdb-api.com/${lang}/API/Title/${imdbApiKey}/${id}/FullActor, FullCast, Posters, Images, Trailer, Ratings, Wikipedia`);
    const data = await res.json() as MovieEntity


    console.log(data)


        return data;
}




    static async findActorByName(name:string,lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/en/API/SearchName/${imdbApiKey}/${name}`)  ;
        const data = await res.json();

        console.log(data)
        return data
    }

    static async findActorById(id:string,lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/Name/${imdbApiKey}/${id}`)  ;
        const data = await res.json();

        console.log(data)
        return data
    }





}