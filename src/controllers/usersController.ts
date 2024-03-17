import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
    //get /users/current/watching
    watching: async (req:AuthenticatedRequest,res:Response)=>{
        const {id} = req.user!

        try {
            const watching = await userService.getKeepWatchingList(Number(id))
            return res.json(watching)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}