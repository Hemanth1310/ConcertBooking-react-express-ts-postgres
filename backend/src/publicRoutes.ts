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


router.get('/concerts/:id',async(req,res)=>{
    const id = Number(req.params.id)

    try{
        const concert :Concert|null = await prisma.concert.findUnique({
            where:{id:id},
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

        if(!concert){
            res.status(404).send("Requested not found")
        }

        res.json({
            message:`Concert Details for ${id}`,
            payload:{
                concert
            }
        })
    }catch(error){
        res.send(error)
    }
})


router.get('/featured',async(req,res)=>{
    try{
        const featuredConcert :Concert[] = await prisma.concert.findMany({
        where:{
            isFeatured:true
        }
         })
    }catch(error){
        res.send(error)
    }
      
})

export default router