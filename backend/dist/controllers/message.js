"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../utils/common");
const prisma = new client_1.PrismaClient();
/**
 *  @method  GET
 *  @route   /api/messages
 *  @desc    Get all messages where the connected user is sender or receiver
 *  @access  private
*/
const getMessages = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Not Authenticated" });
            return;
        }
        const senderId = req.user.id;
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
        res.status(200).json({ messages });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.getMessages = getMessages;
