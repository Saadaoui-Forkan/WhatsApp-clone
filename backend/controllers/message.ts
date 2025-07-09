import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../utils/common.js";

const prisma = new PrismaClient();

/**
 *  @method  GET
 *  @route   /api/messages
 *  @desc    Get all messages where the connected user is sender or receiver
 *  @access  private
*/
export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => { 
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not Authenticated" });
      return; 
    }
    const senderId = req.user.id
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId },
          { receiverId: senderId }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    res.status(200).json({ messages })
  } catch (err) {
    handleError(res, err as Error);
  }
};