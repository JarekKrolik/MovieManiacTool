export interface MovieListEntity {
    id:string,
    title:string,
    description:string,
    image:string,
    resultType:string,

}


export interface NowInCinemasMovieEntity extends MovieListEntity{

    fullTitle:string,
    genres:string,
    year:string,
    stars:string,
    releaseState:string,



}

export interface SingleMovieSpecific {
    actorList:any[],
    awards:string,
    companies:string,
    contentRating:string,
    directors:string,
    fullTitle:string,
    genres:string,
    imDbRating:string,
    image:string,
    images:{
        items:{
            image:string,
            title:string,
        }[],
    };
    keywords:string,
    plot:string,
    metacriticRating:string,
    releaseDate:string,
    stars:string,
    tagline:string|null,
    year:string,
    writers:string,
    wikipedia:object,
    type:string,
    runtimeStr:string,
boxOffice:{
        budget:string,
    cumulativeWorldwideGross:string,

}

}

export interface ActorsListEntity {
    description:string,
    id:string,
    image:string,
    resultType:string,
    title:string,

}