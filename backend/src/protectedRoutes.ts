import express from "express";
import authenticateToken from "./middleware/auth";
import { prisma } from "./prisma";
import { Booking, Prisma } from "@prisma/client";
import { updateProfileSchema } from "./utils/TypeChecker";

const router = express.Router();
router.use(authenticateToken);
router.use(express.json());

/**
 * userDetails Route
 * * Responsibilities:
 * - Gets userID with JWT token 
 * - Returns the user details
 */

router.get("/userDetails", async (req, res) => {
  const userId = req.user?.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imagePath: true,
      },
    });

    if(!user){
      res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User details",
      payload: { ...user },
    });
  } catch (error: any) {
    res.status(500).json({ error: "An unexpected server error occurred." });
  }
});

/**
 *  Update Profile Route
 * * Responsibilities:
 * - Gets user Details 
 * - Pareses Data with Zod schema for new user
 * - updates user entry with new data
 */


router.patch("/updateProfile", async (req, res) => {
  const newData = req.body;

  const result = updateProfileSchema.safeParse(newData);

  if (!result.success) {
    res.status(401).json({error:"Invalid Update values"});
  }

  try{
      const userData = await prisma.user.update({
        where: { id: req.user?.userId },
        data: {
          ...result.data,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          imagePath: true,
        },
      });

      res.json({
        message: "User profile updated",
        payload: {
          ...userData,
        },
      });

  }catch(error:any){
    if (error.code === "P2025") {
       return res.status(404).json({ error: "User not found" });
    }

   res.status(500).json({ error: "An unexpected server error occurred." });
  }
  
});

/**
 * Book ticket Route
 * * Responsibilities:
 * - Gets user deatils, ticket details and quantity
 * - Create a new record for the booking 
 * - update Available quantity for given ticket ID
 */


router.post("/booking/:concertId/:ticketTypeId", async (req, res) => {
  const {  ticketTypeId } = req.params;
  const userId = req.user!.userId;
  const quantity = Number(req.query.qty);
  const ticketId = Number(ticketTypeId);

  try{
    const results = await prisma.$transaction(async (tx)=>{
      const updatedTickets = await tx.ticketType.update({
        where:{id:ticketId},
        data:{
          availableQuantity:{
            decrement:quantity
          }
        }
      })

      if(updatedTickets.availableQuantity<0){
        throw new Error("SOLD OUT")
      }

      const totalPrice = updatedTickets.price * quantity

      const newBooking = await tx.booking.create({
        data:{
          quantity: quantity,
          totalPrice: totalPrice,
          userId: userId,
          ticketTypeId: ticketId,
        }
      })

      return newBooking
    })

    res.status(201).json({ message: "Booking Successful", payload: results });

  }catch(error:any){
    if(error.message==="SOLD OUT"){
      return res.status(400).json({error:"Not enough tickets available"})
    }

    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * Register Route
 * * Responsibilities:
 * - Gets Booking ID
 * - Return booking details for the id
 */

router.get("/booking/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const bookingDetails = await prisma.booking.findUnique({
      where: { id },
      include: {
        ticketType: {
          include: {
            concert: true,
          },
        },
      },
    });
    if (!bookingDetails) {
      return res.status(404).send("Booking not found.");
    }

    return res.json({
      message: "Booking details Success",
      payload: { ...bookingDetails },
    });
  } catch (error) {
    return res.status(500).send("Connection to server failed.");
  }
});

/**
 * Register Route
 * * Responsibilities:
 * - Gets User details
 * - return all the bookings done by the user 
 */


router.get("/bookings", async (req, res) => {
  const user = req.user?.userId;

  try {
    const userBookingHistory = await prisma.booking.findMany({
      where: { userId: user },
      include: {
        ticketType: {
          include: {
            concert: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      message: "Booking details of user",
      payload: {
        bookingHistory: userBookingHistory,
      },
    });
  } catch (error) {
    return res.status(404).send("Booking details not found");
  }
});

/**
 * Register Route
 * * Responsibilities:
 * - Gets user ID
 * - REturn 3 recent bookings done by the user
 */


router.get("/recentBookings", async (req, res) => {
  const userId = req.user?.userId;
  try {
    const recentBookings = await prisma.booking.findMany({
      where: { userId },
      take: 3,
      include: {
        ticketType: {
          include: {
            concert: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      message: "Recent Bookings",
      payload: {
        recentBookings,
      },
    });
  } catch (error) {
    return res.status(404).send("User not found");
  }
});

export default router;
