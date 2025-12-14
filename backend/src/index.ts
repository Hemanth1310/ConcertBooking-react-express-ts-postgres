import  express  from "express";
import authRouter from './authenticationRoutes'
import protectedRoutes from './protectedRoutes'
import publicRoutes from './publicRoutes'
import cors from 'cors'
const app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth',authRouter)
app.use('/api',protectedRoutes)
app.use('/data',publicRoutes)

app.listen(3008,()=>{
    console.log("Listening on port 3008")
})