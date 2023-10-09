import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'


import { connectMongoDB } from './src/config/conecction.js'

import autorRoutes from './src/routes/autor.routes.js'
import libroRoutes from './src/routes/libro.routes.js'


const app = express()
const PORT = 4000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(morgan('dev'))

//Configuracion para subir archivos
app.use(fileUpload())


app.use('/api', autorRoutes)
app.use('/api', libroRoutes)


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
    connectMongoDB()
})