import {  Prisma, User } from '@prisma/client'
import express from 'express'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'
import { userDetails } from './types'
const router = express.Router()

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
            data:{
                user
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
       { res.json({
            message:'login successful!',
            data:{
                firstname:user.firstName,
                lastname:user.lastName,
                email:user.email,
                id:user.id,
            }
        })}else{
            res.status(401).json({error: 'Invalid credentials.' })
        }
    }catch(error){
        console.error('Login error:', error);
        return res.status(500).json({ error: 'An unexpected server error occurred.' });
    }

})


export default router