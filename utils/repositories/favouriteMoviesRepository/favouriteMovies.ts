import {pool} from "../../db";
import {ActorsListEntity, MovieListEntity} from "../../../types";
import {FieldPacket} from "mysql2";
import {v4} from "uuid";

export class FavouriteMovies {
    static async getFavouriteActors(user: string) {
        const actorsList = await pool.execute("SELECT * FROM `favourite_actors` WHERE `user`=:user", {
            user: user,
        }) as [ActorsListEntity[], FieldPacket[]]

        return actorsList[0]
    }

    static async getFavouriteMovies(user: string) {
        const moviesList = await pool.execute("SELECT * FROM `favourites` WHERE `user`=:user", {
            user: user,
        }) as [MovieListEntity[], FieldPacket[]]

        return moviesList[0]
    }

    static async insertFavouriteMovieIntoDatabase(id: string, user: string, title: string, image: string) {
        const recordId = v4()
        await pool.execute("INSERT INTO `favourites` (`id`,`movie_id`,`user`,`name`,`image`) VALUES (:recordId,:id,:user,:name,:image)", {
            recordId,
            id,
            user,
            name: title,
            image,
        })
    }

    static async insertFavouriteActorIntoDatabase(id: string, user: string, title: string, image: string) {
        const recordId = v4()
        await pool.execute("INSERT INTO `favourite_actors` (`id`,`actor_id`,`user`,`name`,`image`) VALUES (:recordId,:id,:user,:name,:image)", {
            recordId,
            id,
            user,
            name: title,
            image,
        })
    }

    static async deleteMovieFromFavouritesList(id: string, user: string) {
        await pool.execute(" DELETE FROM `favourites` WHERE `movie_id`=:id AND `user`=:user", {
            id,
            user,
        })
    }

    static async deleteActorFromFavouritesList(id: string, user: string) {
        await pool.execute(" DELETE FROM `favourite_actors` WHERE `actor_id`=:id AND `user`=:user", {
            id,
            user,
        })
    }

    static async deleteAllFavouriteMoviesAndActors(user: string) {
        await pool.execute(" DELETE FROM `favourite_actors` WHERE  `user`=:user", {
            user,
        })
        await pool.execute(" DELETE FROM `favourites` WHERE  `user`=:user", {
            user,
        })
    }

}