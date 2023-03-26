import {pool} from "../../db";
import {AnswerToComment, CommentsEntity, DislikeEntity, LikeEntity} from "../../../types";
import {FieldPacket} from "mysql2";

export class CommentsRepository {

    // start  likes and dislikes service methods ************************************

    static async insertDislikeIntoDatabase(id: string, commentId: string, user: string) {
        await pool.execute("INSERT INTO `comments_dislikes`(`id`, `disliked_id`, `user`) VALUES (:id,:disliked_id,:user)", {
            id,
            disliked_id: commentId,
            user,
        })
    }

    static async insertLikeIntoDatabase(id: string, commentId: string, user: string) {
        await pool.execute("INSERT INTO `comments_likes`(`id`, `liked_id`, `user`) VALUES (:id,:liked_id,:user)", {
            id,
            liked_id: commentId,
            user,
        })
    }

    static async updateDislikesCountInComment(commentId: string, newLikesNumber: number, type: string) {
        if (type === 'comment') {
            await pool.execute("UPDATE `comments` SET `disliked`=:number WHERE `id`=:id", {
                id: commentId,
                number: newLikesNumber,
            })
        }
        if (type === 'answer') {
            await pool.execute("UPDATE `comments_answers` SET `disliked`=:number WHERE `id`=:id", {
                id: commentId,
                number: newLikesNumber,
            })
        }
    }

    static async updateLikesCountInComment(commentId: string, newLikesNumber: number, type: string) {
        if (type === 'comment') {
            await pool.execute("UPDATE `comments` SET `liked`=:number WHERE `id`=:id", {
                id: commentId,
                number: newLikesNumber,
            })
        }
        if (type === 'answer') {
            await pool.execute("UPDATE `comments_answers` SET `liked`=:number WHERE `id`=:id", {
                id: commentId,
                number: newLikesNumber,
            })
        }
    }

    static async getDislikesCountFromComment(commentId: string, type: string) {
        if (type === 'comment') {
            let likesNumber = await pool.execute("SELECT  `disliked` FROM `comments` WHERE `id`=:commentId", {
                commentId,
            }) as [CommentsEntity[], FieldPacket[]]

            return likesNumber[0][0]
        }
        if (type === 'answer') {
            let likesNumber = await pool.execute("SELECT  `disliked` FROM `comments_answers` WHERE `id`=:commentId", {
                commentId,
            }) as [AnswerToComment[], FieldPacket[]]

            return likesNumber[0][0]
        }
    }

    static async getLikesCountFromComment(commentId: string, type: string) {
        if (type === 'comment') {
            let likesNumber = await pool.execute("SELECT  `liked` FROM `comments` WHERE `id`=:commentId", {
                commentId,
            }) as [CommentsEntity[], FieldPacket[]]

            return likesNumber[0][0]
        }
        if (type === 'answer') {
            let likesNumber = await pool.execute("SELECT  `liked` FROM `comments_answers` WHERE `id`=:commentId", {
                commentId,
            }) as [AnswerToComment[], FieldPacket[]]

            return likesNumber[0][0]
        }
    }

    static async getDislikes(user: string, commentId: string) {
        const data = await pool.execute("SELECT `disliked_id`, `user` FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
            user,
            commentId,
        }) as [DislikeEntity[], FieldPacket[]]
        return data[0]
    }

    static async getLikes(user: string, commentId: string) {
        const data = await pool.execute("SELECT * FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
            user,
            commentId,
        }) as [LikeEntity[], FieldPacket[]]

        return data[0]
    }

    static async deleteLike(user: string, commentId: string) {
        pool.execute("DELETE FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
            user,
            commentId,
        })
    }

    static async deleteDislike(user: string, commentId: string) {
        pool.execute("DELETE FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
            user,
            commentId,
        })
    }

    // end  likes and dislikes service methods ************************************

    static async addAnswerToComment(newId: string, mainCommentId: string, comment: string, user: string, avatar: number) {
        await pool.execute("INSERT INTO `comments_answers`(`id`, `comment_id`, `comment`,  `user`, `avatar`) VALUES (:id,:mainCommentId,:comment,:user,:avatar)", {
            id: newId,
            mainCommentId,
            comment,
            user,
            avatar,

        })
    }

    static async updateAnswerToComment(id: string, comment: string) {
        await pool.execute("UPDATE `comments_answers` SET `comment`=:comment WHERE `id`=:id", {
            id,
            comment,
        })
    }

}