import  express  from "express";
import authRouter from './authenticationRoutes'
const app = express()

app.use('/auth',authRouter)

app.listen(3008,()=>{
    console.log("Listening on port 3008")
})