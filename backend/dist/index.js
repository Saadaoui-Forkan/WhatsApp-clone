"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const passwordRoute_1 = __importDefault(require("./routes/passwordRoute"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const auth_1 = require("./middlewares/auth");
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 5001;
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_DOMAIN_URL,
        credentials: true
    }
});
exports.io.use(auth_1.isSocketAuth);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_DOMAIN_URL,
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Hello From Server");
});
app.use('/api/users', userRoute_1.default);
app.use('/api/profile', profileRoute_1.default);
app.use('/api/users/password', passwordRoute_1.default);
app.use('/api/messages', auth_1.isAuth, messageRoute_1.default);
exports.io.on("connection", (socket) => {
    console.log("connected user: ", socket.data.userInfo);
    const userId = socket.data.userInfo.id;
    socket.join(userId);
    socket.on("disconnected", () => {
        console.log("disconnected user: ", socket.id);
    });
    socket.on("send_message", async ({ receiverId, content }) => {
        const senderId = userId;
        const message = await prisma.message.create({
            data: {
                receiverId,
                senderId,
                content,
            },
        });
        exports.io.to([receiverId, senderId]).emit("receive_message", message);
    });
    socket.on("typing", (receiverId) => {
        socket.to(receiverId).emit("typing", userId);
    });
    socket.on("stop_typing", (receiverId) => {
        socket.to(receiverId).emit("stop_typing", userId);
    });
    socket.on("seen", async (receiverId) => {
        const senderId = userId;
        await prisma.message.updateMany({
            where: {
                senderId,
                receiverId,
                seen: false,
            },
            data: {
                seen: true,
            },
        });
        exports.io.emit("seen", senderId);
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
