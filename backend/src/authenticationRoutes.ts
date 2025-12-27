import { Prisma } from '@prisma/client'
import express from 'express'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'
import { decodedToken, userDetails } from './types'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_secret = process.env.JWT_secret || '123456789'


router.use(express.json())

router.post('/register',async(req,res)=>{
    const {firstName,lastName,password,email} = req.body as Prisma.UserCreateInput
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const user:userDetails =await prisma.user.create({
            data:{
                firstName,lastName,password:hashedPassword,email
            },
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            }
        })

        res.json({
            message:'Profile Created',
            payload:{
                ...user
            }
        })
    }catch(error){
        res.send(error)
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await prisma.user.findUnique({
           where:{email:email},
           select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: true, 
            }
        })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch)
       { 
            const tokenPayload :decodedToken = {
                userId:user.id,
                email:user.email
            }

            const token = jwt.sign(
                tokenPayload,
                JWT_secret,
                {expiresIn:"1hr"}
            )

            const {password, ...userData} = user

            res.json({
            message:'login successful!',
            token:token,
            payload:{
                ...userData
            }
        })}else{
            res.status(401).json({error: 'Invalid credentials.' })
        }
    }catch(error){
        console.error('Login error:', error);
        return res.status(500).json({ error: 'An unexpected server error occurred.' });
    }

})

router.get('/validate',async(req,res)=>{
    const {email} = req.query
    const emailId=email?.toString()
    try{
        const userData = await prisma.user.findUnique({
            where:{email:emailId?.toLocaleLowerCase()},
            select:{
                id:true
            }
        })
        if(userData){
            res.json({
                isValid:true
            })
        }
        return res.status(404).json({ exists: false, message: "User not found" });
    }catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
})

export default router