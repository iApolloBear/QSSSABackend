import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";

class Server {
  private app: Application;
  private port: String;
  private server: HttpServer;
  private io: SocketServer;

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
  }

  listen() {
    this.middlewares();
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

export default Server;
