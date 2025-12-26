import express from 'express'
import { prisma } from './prisma';
import { Prisma,Concert, TicketType } from '@prisma/client';

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

router.get('/ticketInfo/:id',async(req,res)=>{
    const id:number = Number(req.params.id)
    try{
        const ticketInfo: TicketType[]= await prisma.ticketType.findMany({
            where:{concertId:id},
            select:{
                id:true,
                concertId:true,
                name:true,
                price:true,
                availableQuantity:true,
                totalQuantity :true,
            }
        })
        
        if(!ticketInfo){
            res.status(404).send("Technical error : Please come back later.Concert data not available")
        }

        res.json({
            message:'Tickets Information',
            payload:{
                ticketInfo
            }
        })
        
    }catch(error){
        res.status(405).send(error)
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