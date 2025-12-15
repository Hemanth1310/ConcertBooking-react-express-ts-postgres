import express from 'express'
import { prisma } from './prisma';
import { Prisma,Concert } from '@prisma/client';

const router = express.Router()

router.get('/concerts',async(req,res)=>{
   try{
    const concerts : Concert[]= await prisma.concert.findMany({
        select:{
            id:true,
            name: true,
            artist: true,
            date: true,
            venue: true,
            description: true,
            category: true, 
            isFeatured: true,
            imagePath:true
        }
    })
    console.log(concerts)
    res.json({
        message:'List of Concerts',
        payload:{
            concerts:concerts
        }
    })

    }catch(error){
        console.error('Concerts error:', error);
        return res.status(500).json({ error: 'An unexpected server error occurred.' });
    }

})

router.get('/featured',async(req,res)=>{
    const featuredConcert :Concert[] = await prisma.concert.findMany({
        where:{
            isFeatured:true
        }
    })  
})

export default router