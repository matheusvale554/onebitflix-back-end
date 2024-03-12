import { Request, Response } from "express";
import { userService } from "../services/userService";
import { RESOURCES_INITIALIZE } from "adminjs";

export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body


        try {
            const userAlreadyExist = await userService.findByEmail(email)

            if (userAlreadyExist) {
                throw new Error('Este e-mail já está cadastrado.')
            }

            const user = await userService.create({
                firstName,
                lastName,
                birth,
                phone,
                email,
                password,
                role:'user'
            })
return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}