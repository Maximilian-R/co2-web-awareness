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

  socket.on("payload", async (url) => {
    console.log("On payload:", url);
    try {
      lighthouse.trackProgress(socket, (status) =>
        socket.emit("status", { status })
      );
      const bytes = await lighthouse.totalBytes(url);
      // const overallSavingsBytes = await lighthouse.savingsBytes(url);
      // console.log("Total transfered bytes", bytes);
      socket.emit("result",  bytes );
    } catch (error) {
      console.error(error);
      socket.emit("error", {
        error: "Could not generate the report",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});
