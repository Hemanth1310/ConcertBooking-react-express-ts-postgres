import express from 'express'
import authenticateToken from './middleware/auth'
import { prisma } from './prisma'

const router = express.Router()

router.get('/userDetails',authenticateToken,async(req,res)=>{
    const userId = req.user?.userId

    try{
        const user = await prisma.user.findUnique({
            where:{id:userId},
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            }
        })

        res.json({
            message:"User details",
            data:{...user}
        })
    }catch(error){
        res.status(404).json({error:'User not found'})
    }
})

export default router 