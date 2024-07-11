"use strict";

const { Server } = require("socket.io");

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || process.env.CLIENT_URL_DEVELOPMENT,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", (userMessage) => {
        console.log("User:", userMessage);

        // Add a delay before sending the response
        setTimeout(() => {
          socket.emit("message", `Server: ${userMessage}`);
        }, 50);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    console.log("WebSocket server is running");
  },
};
