import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import fileUpload from "express-fileupload";
import roleRoutes from "../routes/role";
import authRoutes from "../routes/auth";
import qsssaRoutes from "../routes/qsssa";
import groupRoutes from "../routes/group";
import uploadRoutes from "../routes/upload";
import teacherRoutes from "../routes/teacher";
import studentRoutes from "../routes/student";
import messageRoutes from "../routes/message";
import answerRoutes from "../routes/answer";
import commentRoutes from "../routes/comment";
import likeRoutes from "../routes/like";
import adminRoutes from "../routes/admin";
import Sockets from "./socket";
import path from "path";

class Server {
  private app: Application;
  private port: String;
  private server: HttpServer;
  private io: SocketServer;
  private apiRoutes = {
    roles: "/api/roles",
    auth: "/api/auth",
    qsssa: "/api/qsssa",
    group: "/api/group",
    upload: "/api/upload",
    teacher: "/api/teacher",
    student: "/api/student",
    messages: "/api/message",
    answers: "/api/answer",
    comments: "/api/comment",
    like: "/api/like",
    admin: "/api/admin",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "";
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  configureSockets() {
    new Sockets(this.io);
  }

  routes() {
    this.app.use(this.apiRoutes.roles, roleRoutes);
    this.app.use(this.apiRoutes.auth, authRoutes);
    this.app.use(this.apiRoutes.qsssa, qsssaRoutes);
    this.app.use(this.apiRoutes.group, groupRoutes);
    this.app.use(this.apiRoutes.upload, uploadRoutes);
    this.app.use(this.apiRoutes.teacher, teacherRoutes);
    this.app.use(this.apiRoutes.student, studentRoutes);
    this.app.use(this.apiRoutes.messages, messageRoutes);
    this.app.use(this.apiRoutes.answers, answerRoutes);
    this.app.use(this.apiRoutes.comments, commentRoutes);
    this.app.use(this.apiRoutes.like, likeRoutes);
    this.app.use(this.apiRoutes.admin, adminRoutes);
    this.app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"), (err) =>
        res.status(500).send(err)
      );
    });
  }

  listen() {
    this.middlewares();
    this.configureSockets();
    this.routes();
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

export default Server;
