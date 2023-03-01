export interface MovieListEntity {
    id: string,
    title: string,
    description: string,
    image: string,
    resultType: string,
    errorMessage: string,
}

export interface Response {
    "searchType": string,
    "expression": string,
    "results": MovieListEntity[] | ActorsListEntity[]
    "errorMessage": string,
}

export interface NowInCinemasMovieEntity extends MovieListEntity {

    fullTitle: string,
    genres: string,
    year: string,
    stars: string,
    releaseState: string,
    errorMessage: string,


}

export interface SingleMovieSpecific {
    posters: {
        backdrops: {
            id:string,
            link:string,
        }[],
        posters: {
            id: string,
            link: string,
        }[]
    }
    errorMessage: string,
    fullCast: {
        actors: {
            asCharacter: string,
            id: string,
            image: string,
            name: string,
        }[]
    },
    awards: string,
    trailer: {
        link: string,
        linkEmbed: string,
    },
    countries: string,
    companies: string,
    contentRating: string,
    directors: string,
    fullTitle: string,
    genres: string,
    imDbRating: string,
    image: string,
    ratings: {
        filmAffinity: string,
        imDb: string,
        metacritic: string,
        rottenTomatoes: string,
        theMovieDb: string,

    },
    images: {
        items: {
            image: string,
            title: string,
        }[],
    };
    keywords: string,
    plot: string,
    metacriticRating: string,
    releaseDate: string,
    stars: string,
    tagline: string | null,
    year: string,
    languages: string,
    writers: string,
    wikipedia: object,
    type: string,
    runtimeStr: string,
    boxOffice: {
        budget: string,
        cumulativeWorldwideGross: string,

    }

}

export interface ActorsListEntity {
    description: string,
    id: string,
    image: string,
    resultType: string,
    title: string,
    errorMessage: string,

}

export interface SingleActorSpecific {
    errorMessage: string,
    id: string,
    name: string,
    image: string,
    summary: string,
    awards: string,
    birthDate: string,
    deathDate: string,
    height: string,
    castMovies: {
        description: string,
        id: string,
        role: string,
        title: string,
        year: string,
    }[],


}

export interface FavouriteMoviesList {
    user: string,
    movie_id: string,
    name: string,
    image: string,
}

export interface FavouriteActorsList {
    user: string,
    actor_id: string,
    name: string,
    image: string,
}