import express from 'express'
import authenticateToken from './middleware/auth'
import { prisma } from './prisma'
import { Booking, Prisma } from '@prisma/client'

const router = express.Router()
router.use(authenticateToken)
router.get('/userDetails',async(req,res)=>{
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
            payload:{...user}
        })
    }catch(error){
        res.status(404).json({error:'User not found'})
    }
})

router.post('/booking/:concertId/:ticketTypeId',async(req,res)=>{
    const {concertId,ticketTypeId} = req.params;
    const userId=req.user?.userId
    const {qty} = req.query
    const quantity = Number(qty)
    const formatedTicketTypeId = Number(ticketTypeId)
  

    try{

        const currentTicketInfo = await prisma.ticketType.findUnique({
            where:{id:formatedTicketTypeId},
        })
        if(currentTicketInfo && userId){
            
            const newAvailableQuantity = currentTicketInfo.availableQuantity - quantity
            const totalPrice= currentTicketInfo.price * quantity
            const newBooking :Booking=await prisma.booking.create({
                data:{
                    quantity:newAvailableQuantity,
                    totalPrice:totalPrice,
                    user: {
                        connect: { id: userId } 
                    },
                    ticketType: {
                        connect: { id: formatedTicketTypeId }
                    },
                }
            })
            await prisma.ticketType.update({
                data:{
                    availableQuantity:newAvailableQuantity
                },
                where:{id:formatedTicketTypeId}
            }) 

            res.json({
                message:"Booking Successful",
                payload:{
                    ...newBooking
                }
            })
            
        }else{
            res.status(400).send("Requested ticket not available")
        }
        

    }catch(error){
        res.status(405).send(error)
    }

})

router.get('/booking/:id',async(req,res)=>{
    const id = Number(req.params.id)
    try{
       const bookingDetails = await prisma.booking.findUnique({
            where: { id },
            include: {
                ticketType: {
                    include: {
                        concert: true 
                    }
                }
            }
        })
        if(!bookingDetails){
            return res.status(404).send("Booking not found.")
        }

        res.json({
            message:"Booking details Success",
            payload:{...bookingDetails},
        })
    }catch(error){
        res.status(500).send("Connection to server failed.")
    }


})

router.get('/bookings',async(req,res)=>{
    const user = req.user?.userId

    try{
        const userBookingHistory = await prisma.booking.findMany({
            where:{userId:user},
            include:{
                ticketType:{
                    include:{
                        concert:true
                    }
                }
            }
        })

        res.json({
            message:"Booking details of user",
            payload:{
                bookingHistory:userBookingHistory
            }
        })
    }catch(error){
        res.status(404).send("Booking details not found")
    }
})

export default router 