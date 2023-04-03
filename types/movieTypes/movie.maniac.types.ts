export interface MovieListEntity {
    id: string,
    title: string,
    description: string,
    image: string,
    resultType: string,
    errorMessage: string,
}

export interface ActorsListEntity {
    description: string,
    id: string,
    image: string,
    resultType: string,
    title: string,
    errorMessage: string,

}

export interface Response {
    searchType: string,
    expression: string,
    results: MovieListEntity[] | ActorsListEntity[]
    errorMessage: string,
}

export interface NowInCinemasMovieEntity extends MovieListEntity {

    fullTitle: string,
    genres: string,
    year: string,
    stars: string,
    releaseState: string,
    errorMessage: string,
    image: string,
    id: string,
    contentRating: string,
    directors: string,
    plot: string,
    runtimeStr: string,


}

export interface SingleMovieSpecific {
    id: string,
    similars: {
        id: string,
        imDbRating: string,
        image: string,
        title: string,
    }[]
    posters: {
        backdrops: {
            id: string,
            link: string,
        }[],
        posters: {
            id: string,
            link: string,
        }[]
    }
    errorMessage: string,
    fullCast: {
        others: {
            job: string,
            items: {
                id: string,
                name: string,
                description: string
            }[]
        }[]
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
    type: string,
    runtimeStr: string,
    boxOffice: {
        budget: string,
        cumulativeWorldwideGross: string,

    }
    wikipedia: {
        plotFull: {
            plainText: string
        },
    }

}

export interface YoutubeTrailer {
    "imDbId": string,
    "title": string,
    "fullTitle": string,
    "type": string,
    "year": string,
    "videoId": string,
    "videoUrl": string,
    "errorMessage": string,
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

    knownFor: {
        fullTitle: string,
        id: string,
        image: string,
        role: string,
        year: string,
    }[]


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

export interface CommentsEntity {
    id: string,
    name: string,
    comment: string,
    created_at: Date,
    avatar: number,
    type: string,
    commented_id: string,
    liked: number,
    disliked: number,

}

export interface CommentsResponse {
    message?: string,
    result: CommentsEntity[] | [],
}

export interface AnswerToComment {
    id: string,
    comment_id: string,
    comment: string,
    avatar: number,
    user: string,
    created_at: Date,
    liked: number,
    disliked: number,
}

export interface LikeEntity {
    id: string,
    liked_id: string,
    user: string,
    original_comment_id: string,
}

export interface DislikeEntity {
    id: string,
    dislike_id: string,
    user: string,
    original_comment_id: string,
}

export interface AnswersResponse {
    result: AnswerToComment[],
    message: string,
}

export type StreamingProviderLinks = {
    type: string,
    quality: string,
    link: string,
    addon: string,
}


export interface StreamingAvailability {
    us: {
        provider?: StreamingProviderLinks[],
    }

}