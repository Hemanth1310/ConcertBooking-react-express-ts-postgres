import { User } from '@prisma/client'
import express from 'express'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'
const router = express.Router()

router.use(express.json())

router.post('/register',async(req,res)=>{
    const {firstName,lastName,passwordHash,email} = req.body as User
    const hashedPassword = await bcrypt.hash(passwordHash,10)
    try{
        const user = prisma.user.create({
            data:{
                firstName,lastName,passwordHash:hashedPassword,email
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

export default router