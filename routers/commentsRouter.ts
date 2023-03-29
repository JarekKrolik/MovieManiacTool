import {Request, Response, Router} from "express";
import {ValidationError} from "../utils/handleErrors";
import {v4} from 'uuid';
import {CommentsRepository} from "../utils/repositories/commentsRepository/commentsRepository";


export const commentsRouter = Router()
    .delete('/likes', async (req: Request, res: Response) => {
        try {
            const {commentId, user, type} = req.body;
            const id = v4()
            const mainCommentId = type === 'comment' ? commentId : await CommentsRepository.getMainCommentIdFromAnswer(commentId)
            const dislikesList = await CommentsRepository.getDislikes(user, commentId)
            if (dislikesList.length === 0) {
                const likesList = await CommentsRepository.getLikes(user, commentId)
                if (likesList.length > 0) {
                    await CommentsRepository.deleteLike(user, commentId)

                    if (type === 'comment') {
                        const likesNumber = await CommentsRepository.getLikesCountFromComment(commentId, type)
                        const newLikesNumber = --likesNumber.liked
                        await CommentsRepository.updateLikesCountInComment(commentId, newLikesNumber, type)

                    }

                    if (type === 'answer') {
                        const likesNumber = await CommentsRepository.getLikesCountFromComment(commentId, type)
                        const newLikesNumber = --likesNumber.liked
                        await CommentsRepository.updateLikesCountInComment(commentId, newLikesNumber, type)
                    }


                }
                await CommentsRepository.insertDislikeIntoDatabase(id, commentId, user, mainCommentId)

                if (type === 'comment') {
                    const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                    const newDislikesNumber = ++dislikesCount.disliked
                    await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                }

                if (type === 'answer') {
                    const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                    const newDislikesNumber = ++dislikesCount.disliked
                    await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)
                }

                res.json({
                    message: 'dislike added'
                })

            } else {
                res.json({
                    message: 'comment already disliked'
                })
            }
        } catch (e) {
            throw new ValidationError(e)
        }

    })
    .post('/likes', async (req: Request, res: Response) => {
        try {
            const {commentId, user, type} = req.body;
            const id = v4()
            const likesList = await CommentsRepository.getLikes(user, commentId)
            const mainCommentId = type === 'comment' ? commentId : await CommentsRepository.getMainCommentIdFromAnswer(commentId)

            if (likesList.length === 0) {
                const dislikesList = await CommentsRepository.getDislikes(user, commentId)
                if (dislikesList.length > 0) {
                    await CommentsRepository.deleteDislike(user, commentId)

                    if (type === 'comment') {
                        const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                        const newDislikesNumber = --dislikesCount.disliked
                        await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)

                    }

                    if (type === 'answer') {
                        const dislikesCount = await CommentsRepository.getDislikesCountFromComment(commentId, type)
                        const newDislikesNumber = --dislikesCount.disliked
                        await CommentsRepository.updateDislikesCountInComment(commentId, newDislikesNumber, type)

                    }
                }
                await CommentsRepository.insertLikeIntoDatabase(id, commentId, user, mainCommentId)

                if (type === 'comment') {
                    const likesCount = await CommentsRepository.getLikesCountFromComment(commentId, type)
                    const newLikesCount = ++likesCount.liked
                    await CommentsRepository.updateLikesCountInComment(commentId, newLikesCount, type)

                }
                if (type === 'answer') {
                    const likesCount = await CommentsRepository.getLikesCountFromComment(commentId, type)
                    const newLikesCount = ++likesCount.liked
                    await CommentsRepository.updateLikesCountInComment(commentId, newLikesCount, type)
                }
                res.json({
                    message: 'like added'
                })
            } else {
                res.json({
                    message: 'already liked this comment'
                })
            }
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/answers', async (req: Request, res: Response) => {
        try {
            const {mainCommentId, comment, user, avatar} = req.body
            const newId = v4()
            await CommentsRepository.addAnswerToComment(newId, mainCommentId, comment, user, avatar)
            res.json({message: 'answer to comment added'})
        } catch (e) {
            throw new ValidationError(e)
        }

    })
    .put('/answers/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const {comment} = req.body;
            await CommentsRepository.updateAnswerToComment(id, comment)
            res.json({
                message: 'answer to comment updated',
            })
        } catch (e) {
            throw new ValidationError(e)

        }


    })
 
    .get('/answers/:id', async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const data = await CommentsRepository.getAnswersForComment(id)
            res.json(data)
        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .get('/:id/:type', async (req: Request, res: Response) => {
        try {
            const {id, type} = req.params
            const response = await CommentsRepository.getCommentsByMovieId(id, type)
            res.json(response)

        } catch (e) {
            res.json({
                message: e,
                result: [],
            })
        }


    })
    .delete('/answers', async (req: Request, res: Response) => {
        try {
            const {id} = req.body
            await CommentsRepository.deleteAnswerToComment(id)
            await CommentsRepository.deleteAllLikesByCommentId(id)
            await CommentsRepository.deleteAllDislikesByCommentId(id)
            await CommentsRepository.deleteAllAnswersByCommentId(id)
            res.json({
                message: 'answer to comment deleted'
            })
        } catch (e) {
            throw new ValidationError(e)
        }

    })
    .delete('/', async (req: Request, res: Response) => {

        try {
            const id = req.body.id;
            await CommentsRepository.deleteComment(id)
            await CommentsRepository.deleteAllLikesByCommentId(id)
            await CommentsRepository.deleteAllDislikesByCommentId(id)
            await CommentsRepository.deleteAllAnswersByCommentId(id)

            res.json({
                message: 'comment deleted...',
            })

        } catch (e) {
            throw new ValidationError(e)
        }


    })
    .post('/', async (req: Request, res: Response) => {
            try {
                const {comment, commented_id, name, avatar, type} = req.body;
                const id = v4();
                if (comment === ' ' || comment === '') {
                    res.json({
                        message: 'empty comment'
                    })
                } else {
                    await CommentsRepository.insertCommentIntoDatabase(id, commented_id, name, comment, avatar, type)
                    res.json({
                        message: 'comment added...',
                    })
                }

            } catch (e) {
                throw new ValidationError(e)
            }
        }
    )
    .put('/', async (req: Request, res: Response) => {
        try {
            const {id, newComment} = req.body
            if (!newComment || newComment === ' ') {
                res.json({message: 'comment is empty !'})
            } else {
                await CommentsRepository.updateComment(id, newComment)
                res.json({message: 'comment updated'})
            }
        } catch (e) {
            throw new ValidationError(e)
        }


    })
