import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const coursesController = {
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }


}