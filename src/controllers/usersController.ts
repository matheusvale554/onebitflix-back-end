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
    },
    //get /users/current
    show: async (req:AuthenticatedRequest,res:Response)=>{

        try {
            const currentUser = req.user!
            return res.json(currentUser)

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    //put /users/current
    update:async(req:AuthenticatedRequest,res:Response)=>{
        const {id} = req.user!
        const {firstName,lastName,phone,email,birth} = req.body

        try {
            const updatedUser = await userService.update(Number(id),{
                firstName,
                lastName,
                phone,
                email,
                birth,
            })

            return res.json(updatedUser)
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }

    }
}