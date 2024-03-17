import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const episodesController = {
    //get/episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string')
            const range = req.headers.range //bytes=0 - 1024

            episodeService.streamEpisodeToResponse(res,videoUrl,range)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    //GET /EPISODES/:ID/watchtime
    getWatchTime: async (req:AuthenticatedRequest, res:Response)=>{
        const userId = req.user!.id
        const episodeId = req.params.id

        try {
            const watchTime = await episodeService.getWatchTime(Number(userId),Number(episodeId))
        return res.json(watchTime)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
//POST /EPISODES/:ID/watchtime
    setWatchTime: async (req:AuthenticatedRequest, res:Response)=>{
        const userId = Number(req.user!.id);
        const episodeId = Number(req.params.id);
        const {seconds} = req.body

        try {
            const watchTime = await episodeService.setWatchTime({
                userId,
                episodeId,
                seconds
            })
        return res.json(watchTime)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                return res.status(400).json({ message: error.message })
            }
        }
}
}