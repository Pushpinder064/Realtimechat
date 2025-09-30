"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = addMessage;
exports.getMessages = getMessages;
const db_1 = require("../config/db");
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { from, to, message } = req.body;
        yield db_1.prisma.message.create({
            data: {
                message,
                senderId: from,
                receiverId: to,
            },
        });
        res.json({ msg: "Message sent successfully" });
    });
}
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { from, to } = req.body;
        const messages = yield db_1.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: from, receiverId: to },
                    { senderId: to, receiverId: from }
                ]
            },
            orderBy: { createdAt: "asc" }
        });
        const result = messages.map((msg) => ({
            fromSelf: msg.senderId === from,
            message: msg.message,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt
        }));
        res.json(result);
    });
}
