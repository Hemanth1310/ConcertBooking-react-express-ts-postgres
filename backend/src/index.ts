import  express  from "express";
import authRouter from './authenticationRoutes'
const app = express()

app.use('/auth',authRouter)