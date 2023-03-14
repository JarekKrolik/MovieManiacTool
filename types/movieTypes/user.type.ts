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
    favMovies: [{
        movie_id: string,
        user: string,
        name: string,
        image: string,
    }],
    favActors: [{
        actor_id: string,
        user: string,
        name: string,
        image: string,
    }],
    searchList: [
        {
            id: string,
            title: string,
            description: string,
            image: string,
            resultType: string,
            errorMessage: string,
        },
    ],
    selectedItem: {
        id: string,
        type: string,
    }


}

