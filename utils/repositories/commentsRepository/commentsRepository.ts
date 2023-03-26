import {pool} from "../../db";
import {
    AnswersResponse,
    AnswerToComment,
    CommentsEntity,
    CommentsResponse,
    DislikeEntity,
    LikeEntity
} from "../../../types";
import {FieldPacket} from "mysql2";

export class CommentsRepository {

    // start  likes and dislikes service methods ************************************

    static async insertDislikeIntoDatabase(id: string, commentId: string, user: string, mainCommentId: string) {
        await pool.execute("INSERT INTO `comments_dislikes`(`id`, `disliked_id`, `user`,`original_comment_id`) VALUES (:id,:disliked_id,:user,:mainCommentId)", {
            id,
            disliked_id: commentId,
            user,
            mainCommentId
        })
    }

    static async insertLikeIntoDatabase(id: string, commentId: string, user: string, mainCommentId: string) {
        await pool.execute("INSERT INTO `comments_likes`(`id`, `liked_id`, `user`,`original_comment_id`) VALUES (:id,:liked_id,:user,:mainCommentId)", {
            id,
            liked_id: commentId,
            user,
            mainCommentId,
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
        await pool.execute("DELETE FROM `comments_likes` WHERE `user`=:user AND `liked_id`=:commentId", {
            user,
            commentId,
        })
    }

    static async deleteAllLikesByCommentId(id: string) {
        await pool.execute("DELETE FROM `comments_likes` WHERE `original_comment_id`=:id", {
            id,
        })
    }

    static async deleteDislike(user: string, commentId: string) {
        await pool.execute("DELETE FROM `comments_dislikes` WHERE `user`=:user AND `disliked_id`=:commentId", {
            user,
            commentId,
        })
    }

    static async deleteAllDislikesByCommentId(id: string) {
        await pool.execute("DELETE FROM `comments_dislikes` WHERE `original_comment_id`=:id", {
            id,
        })
    }

    // end  likes and dislikes service methods ************************************
    // start   comments and answers to comments methods ****************************

    static async getMainCommentIdFromAnswer(id: string) {
        const mainId = await pool.execute("SELECT  `comment_id` FROM `comments_answers` WHERE `id` = :id", {
            id,
        }) as [AnswerToComment[], FieldPacket[]]

        return mainId[0][0].comment_id
    }

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

    static async getAnswersForComment(id: string) {
        const response = await pool.execute("SELECT * FROM `comments_answers` WHERE `comment_id` = :id", {
            id,
        }) as [AnswerToComment[], FieldPacket[]]
        return {
            result: response[0],
            message: 'comments loaded'
        } as AnswersResponse
    }

    static async getCommentsByMovieId(id: string, type: string) {
        const data = await pool.execute("SELECT `name`, `comment`, `created_at`,`id`, `avatar`,`liked`,`disliked` FROM `comments` WHERE `commented_id`=:id AND `type`=:type ORDER BY `created_at` ASC ", {
            id: id,
            type: type,
        }) as [CommentsEntity[], FieldPacket[]];
        return {
            message: 'ok',
            result: data[0],
        } as CommentsResponse
    }

    static async deleteAnswerToComment(id: string) {
        await pool.execute("DELETE FROM `comments_answers` WHERE `id`=:id", {
            id,
        })
    }

    static async deleteAllAnswersByCommentId(id: string) {
        await pool.execute("DELETE FROM `comments_answers` WHERE `comment_id`=:id", {
            id,
        })
    }

    static async deleteComment(id: string) {
        await pool.execute("DELETE FROM `comments` WHERE `id`=:id", {
            id: id,
        })
    }

    static async insertCommentIntoDatabase(id: string, commented_id: string, name: string, comment: string, avatar: number, type: string) {
        await pool.execute("INSERT INTO `comments`(`id`, `commented_id`, `name`, `comment`, `avatar`, `type`) VALUES (:id,:commented_id,:name,:comment,:avatar,:type)", {
            id,
            commented_id,
            name,
            comment,
            avatar,
            type,
        })
    }

    static async updateComment(id: string, newComment: string) {
        await pool.execute("UPDATE `comments` SET `comment`=:newComment,`created_at`=:date WHERE `id`=:id", {
            id,
            newComment,
            date: new Date(),
        })
    }

    // end comments and answers methods ***************************
}