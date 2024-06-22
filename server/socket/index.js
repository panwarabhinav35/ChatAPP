const express = require("express");

const { Server } = require("socket.io");
const  http  = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

const app = express();

// SOCKET CONNECTION

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});


const onlineUser = new Set()

io.on('connection', async(socket)=>{
    console.log("Connected user " , socket.id)

    const token = socket.handshake.auth.token
    
    // current user details
    const user = await getUserDetailsFromToken(token)
    // create a room
    socket.join(user?._id)
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page' , async (userId)=>{
      console.log(userId)
      const userDetails = await UserModel.findById(userId).select('-password')

      const payload ={
        id : userDetails._id,
        name: userDetails.name,
        email:userDetails.email,
        online : onlineUser.has(userId)
      }
      socket.emit('message-user', payload)
    })

    //disconnect
    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id)
        console.log("disconnected user ", socket.id)
    })
})

module.exports={
    app,
    server
}
