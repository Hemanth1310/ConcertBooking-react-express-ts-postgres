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

    res.json({
      message: "User details",
      payload: { ...user },
    });
  } catch (error: any) {
    res.status(500).json({ error: "User not found" });
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
    res.status(400).send("Invalid update values");
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
  }catch(error){
     res.status(404).json({ error: "User not found" });
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
  const { concertId, ticketTypeId } = req.params;
  const userId = req.user?.userId;
  const { qty } = req.query;
  const quantity = Number(qty);
  const formatedTicketTypeId = Number(ticketTypeId);

  try {
    const currentTicketInfo = await prisma.ticketType.findUnique({
      where: { id: formatedTicketTypeId },
    });
    if (currentTicketInfo && userId) {
      const newAvailableQuantity =
        currentTicketInfo.availableQuantity - quantity;
      const totalPrice = currentTicketInfo.price * quantity;
      const newBooking: Booking = await prisma.booking.create({
        data: {
          quantity: quantity,
          totalPrice: totalPrice,
          user: {
            connect: { id: userId },
          },
          ticketType: {
            connect: { id: formatedTicketTypeId },
          },
        },
      });
      await prisma.ticketType.update({
        data: {
          availableQuantity: newAvailableQuantity,
        },
        where: { id: formatedTicketTypeId },
      });

      res.json({
        message: "Booking Successful",
        payload: {
          ...newBooking,
        },
      });
    } else {
      res.status(400).send("Requested ticket not available");
    }
  } catch (error) {
    res.status(405).json(error);
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

    res.json({
      message: "Booking details Success",
      payload: { ...bookingDetails },
    });
  } catch (error) {
    res.status(500).send("Connection to server failed.");
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

    res.json({
      message: "Booking details of user",
      payload: {
        bookingHistory: userBookingHistory,
      },
    });
  } catch (error) {
    res.status(404).send("Booking details not found");
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

    res.json({
      message: "Recent Bookings",
      payload: {
        recentBookings,
      },
    });
  } catch (error) {
    res.status(404).send("User not found");
  }
});

export default router;
