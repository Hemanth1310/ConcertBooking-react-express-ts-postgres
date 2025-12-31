import express from "express";
import { prisma } from "./prisma";
import { Prisma, Concert, TicketType } from "@prisma/client";

const router = express.Router();

router.get("/concerts", async (req, res) => {
  try {
    const concerts: Concert[] = await prisma.concert.findMany({
      select: {
        id: true,
        name: true,
        artist: true,
        date: true,
        venue: true,
        description: true,
        category: true,
        isFeatured: true,
        imagePath: true,
      },
    });
    console.log(concerts);
    res.json({
      message: "List of Concerts",
      payload: {
        concerts: concerts,
      },
    });
  } catch (error) {
    console.error("Concerts error:", error);
    return res
      .status(500)
      .json({ error: "An unexpected server error occurred." });
  }
});

router.get("/concerts/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const concert: Concert | null = await prisma.concert.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        artist: true,
        date: true,
        venue: true,
        description: true,
        category: true,
        isFeatured: true,
        imagePath: true,
      },
    });

    if (!concert) {
      res.status(404).send("Requested not found");
    }

    res.json({
      message: `Concert Details for ${id}`,
      payload: {
        concert,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/ticketInfo/:id", async (req, res) => {
  const id: number = Number(req.params.id);
  try {
    const ticketInfo: TicketType[] = await prisma.ticketType.findMany({
      where: { concertId: id },
      select: {
        id: true,
        concertId: true,
        name: true,
        price: true,
        availableQuantity: true,
        totalQuantity: true,
      },
    });

    if (!ticketInfo) {
      res
        .status(404)
        .send(
          "Technical error : Please come back later.Concert data not available"
        );
    }

    res.json({
      message: "Tickets Information",
      payload: {
        ticketInfo,
      },
    });
  } catch (error) {
    res.status(405).send(error);
  }
});

export default router;
