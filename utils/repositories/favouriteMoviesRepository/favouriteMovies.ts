import {pool} from "../../db";
import {ActorsListEntity, MovieListEntity} from "../../../types";
import {FieldPacket} from "mysql2";

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
        await pool.execute("INSERT INTO `favourites` (`movie_id`,`user`,`name`,`image`) VALUES (:id,:user,:name,:image)", {
            id,
            user,
            name: title,
            image,
        })
    }

    static async insertFavouriteActorIntoDatabase(id: string, user: string, title: string, image: string) {
        await pool.execute("INSERT INTO `favourite_actors` (`actor_id`,`user`,`name`,`image`) VALUES (:id,:user,:name,:image)", {
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
}