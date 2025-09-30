import { Request, Response } from "express";
import { prisma } from "../config/db";


export async function addMessage(req: Request, res: Response) {
  const { from, to, message } = req.body;
  await prisma.message.create({
    data: {
      message,
      senderId: from,
      receiverId: to,
    },
  });
  res.json({ msg: "Message sent successfully" });
}


export async function getMessages(req: Request, res: Response) {
  const { from, to } = req.body;
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: from, receiverId: to },
        { senderId: to, receiverId: from }
      ]
    },
    orderBy: { createdAt: "asc" }
  });

const result = messages.map((msg: typeof messages[0]) => ({
  fromSelf: msg.senderId === from,
  message: msg.message,
  createdAt: msg.createdAt,
  updatedAt: msg.updatedAt
}));


  res.json(result);
}
