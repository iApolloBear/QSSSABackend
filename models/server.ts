import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import fileUpload from "express-fileupload";
import roleRoutes from "../routes/role";
import authRoutes from "../routes/auth";
import qsssaRoutes from "../routes/qsssa";
import groupRoutes from "../routes/group";

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

  routes() {
    this.app.use(this.apiRoutes.roles, roleRoutes);
    this.app.use(this.apiRoutes.auth, authRoutes);
    this.app.use(this.apiRoutes.qsssa, qsssaRoutes);
    this.app.use(this.apiRoutes.group, groupRoutes);
  }

  listen() {
    this.middlewares();
    this.routes();
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

export default Server;
