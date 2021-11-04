import { Server } from "socket.io";
import { getStudents } from "../controllers/socket";

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      console.log("Connected");

      socket.on("join", async (payload) => {
        socket.join(payload);
        socket.to(payload).emit("get-students", await getStudents(payload));
      });

      socket.on("leave", (payload) => {
        socket.leave(payload);
      });

      socket.on("get-groups", async (payload) => {
        socket.to(payload).emit("get-my-group", payload);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    });
  }
}

export default Sockets;
