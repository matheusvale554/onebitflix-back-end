import express from "express"
import { sequelize } from "./database"
import { adminJs, adminJsRouter } from "./adminjs"
import { router } from "./routes"
import { json } from "sequelize"

const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('conexão com o banco de dados bem sucedida!')
    })
    console.log(`O servidor iniciou com sucesso na porta: ${PORT}`)
})