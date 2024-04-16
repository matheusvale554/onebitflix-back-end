import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likesController = {
    //post/likes
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body

        try {
            const like = await likeService.create(Number(userId), Number(courseId))
            return res.status(201).json(like)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //delete/likes/:id
    delete: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const courseId = req.params.courseId;

        try {
            await likeService.delete(Number(userId), Number(courseId))
            return res.status(201).send("like removido com sucesso!")
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}