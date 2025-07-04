"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../controllers/message");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const messageRouter = (0, express_1.Router)();
messageRouter.get('/', auth_1.isAuth, message_1.getMessages);
exports.default = messageRouter;
