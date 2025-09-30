import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

const onlineUsers = new Map<string, string>();

export function initSocket(server: HTTPServer) {
  const io = new IOServer(server, {
    cors: { origin: "*" }
  });
  
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", ({ from, to, message }) => {
    console.log(`Message from ${from} to ${to}: ${message}`);
    const sendUserSocket = onlineUsers.get(to);
    if (sendUserSocket) {
      console.log(`Sending message to socket ID: ${sendUserSocket}`);
      io.to(sendUserSocket).emit("msg-recieve", { from, message });
    } else {
      console.log(`User ${to} not connected`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        console.log(`Removing user ${key} from online users`);
        onlineUsers.delete(key);
      }
    }
  });
});

}
