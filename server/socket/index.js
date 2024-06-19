const express = require("express");

const { Server } = require("socket.io");
const  http  = require("http");

const app = express();

// SOCKET CONNECTION

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.on('connection', (socket)=>{
    console.log("Connected user " , socket.id)


    //disconnect
    io.on('disconnect',()=>{
        console.log("disconnected user ", socket.id)
    })
})

module.exports={
    app,
    server
}
