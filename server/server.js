import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import lighthouse from "./lighthouse.js";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.set("port", port);

const httpServer = createServer(app);
httpServer.listen(app.get("port"), () => {
  const port = httpServer.address().port;
  console.log("Running on port:", port);
});

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("generate", async (options) => {
    console.log("On generate:", options.url);
    try {
      lighthouse.trackProgress(socket, (status) => {
        socket.emit("status", status);
        console.log("status", status);
      });
      const report = await lighthouse.generateReport(
        options.url,
        options.config
      );
      socket.emit("report", report);
      console.log("Report generated");
    } catch (error) {
      console.error(error);
      socket.emit("error", "Could not generate the report");
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});
