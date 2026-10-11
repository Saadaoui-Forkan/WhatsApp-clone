import { handleError } from "../utils/common.js";
import { prisma } from "../lib/prisma.js";
import { cursorQuerySchema } from "../utils/validationSchema.js";
/**
 *  @method  GET
 *  @route   /api/messages/:userId
 *  @desc    Get messages between current user and :userId (cursor-based)
 *  @access  private
 */
export const getConversationMessages = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authenticated" });
            return;
        }
        const { userId } = req.params;
        const { cursor, limit } = cursorQuerySchema.parse(req.query);
        const currentUserId = req.user.id;
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: userId },
                    { senderId: userId, receiverId: currentUserId },
                ],
            },
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            ...(cursor && { cursor: { id: cursor }, skip: 1 }),
            take: limit + 1,
        });
        const hasMore = messages.length > limit;
        const page = hasMore ? messages.slice(0, limit) : messages;
        const nextCursor = hasMore ? page[page.length - 1]?.id : null;
        res.status(200).json({
            messages: page.reverse(),
            nextCursor,
            hasMore,
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
/**
 *  @method  GET
 *  @route   /api/conversations
 *  @desc    Get all conversations for current user (last message + unread count)
 *  @access  private
 */
export const getConversations = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authenticated" });
            return;
        }
        const currentUserId = req.user.id;
        const friends = await prisma.user.findMany({
            where: { NOT: { id: currentUserId } },
            select: { id: true, name: true, email: true, bio: true, profilePicture: true },
            take: 100,
        });
        const conversations = await Promise.all(friends.map(async (friend) => {
            const [lastMessage, unreadCount] = await Promise.all([
                prisma.message.findFirst({
                    where: {
                        OR: [
                            { senderId: currentUserId, receiverId: friend.id },
                            { senderId: friend.id, receiverId: currentUserId },
                        ],
                    },
                    orderBy: { createdAt: "desc" },
                }),
                prisma.message.count({
                    where: {
                        senderId: friend.id,
                        receiverId: currentUserId,
                        seen: false,
                    },
                }),
            ]);
            return {
                user: friend,
                lastMessage,
                unreadCount,
            };
        }));
        const sorted = conversations
            .filter((c) => c.lastMessage !== null)
            .sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
        res.status(200).json({ conversations: sorted });
    }
    catch (err) {
        handleError(res, err);
    }
};
