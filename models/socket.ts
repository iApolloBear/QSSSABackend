import { Server } from "socket.io";
import {
  getGroups,
  getMessages,
  getMyGroup,
  getStudents,
  getUserMessages,
} from "../controllers/socket";

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

      socket.on("join-group", (payload) => {
        socket.join(payload);
      });

      socket.on("leave", (payload) => {
        socket.leave(payload);
      });

      socket.on("ready", async (payload) => {
        socket.to(payload).emit("get-students", await getStudents(payload));
      });

      socket.on("get-groups", async (payload) => {
        socket.to(payload).emit("get-my-group", payload);
      });

      socket.on("send-message", async (payload) => {
        this.io.to(payload).emit("get-messages", await getMessages(payload));
        this.io
          .to(payload)
          .emit("user-messages", await getUserMessages(payload));
      });

      socket.on("get-user-messages", async (payload) => {
        this.io
          .to(payload)
          .emit("user-messages", await getUserMessages(payload));
      });

      socket.on("reload-group", async (payload) => {
        this.io.to(payload).emit("my-group", await getMyGroup(payload));
      });

      socket.on("get-teacher-groups", async (payload) => {
        this.io.to(payload).emit("teacher-groups", await getGroups(payload));
      });

      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    });
  }
}

export default Sockets;
