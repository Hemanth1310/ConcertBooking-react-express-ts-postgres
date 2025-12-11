import  express  from "express";
import authRouter from './authenticationRoutes'
import protectedRoutes from './protectedRoutes'
const app = express()

app.use('/auth',authRouter)
app.use('/api',protectedRoutes)
app.listen(3008,()=>{
    console.log("Listening on port 3008")
})