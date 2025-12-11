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

export default router