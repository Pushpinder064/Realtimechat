import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);
initSocket(server);

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await prisma.$connect();
  console.log("DB Connected");
  console.log(`Server running on port ${PORT}`);
});
