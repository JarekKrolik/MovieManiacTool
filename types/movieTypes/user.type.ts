import {FavouriteActorsList, FavouriteMoviesList, MovieListEntity} from "./movie.maniac.types";

export interface UserEntity {
    id?: string,
    name: string,
    email: string,
    passwordhash: string,
    isverified: boolean,
    avatar: number,
    verification_code?: number | null,
    date?: any,


}


export interface UserData {
    id: string,
    name: string,
    date: string,
    avatar: number,
    email: string,
    movieId: string,

    favMovies: FavouriteMoviesList[],

    favActors: FavouriteActorsList[],

    searchList:
        {
            id: string,
            title: string,
            description: string,
            image: string,
            resultType: string,
            errorMessage: string,
        }[] | MovieListEntity[],

    selectedItem: {
        id: string,
        type: string,
    }


}

