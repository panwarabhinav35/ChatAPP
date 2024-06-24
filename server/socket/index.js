const express = require("express");

const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
const {
  ConversationModel,
  MessageModel,
} = require("../models/ConversationModel");

const app = express();

// SOCKET CONNECTION

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected user ", socket.id);

  const token = socket.handshake.auth.token;

  // current user details
  const user = await getUserDetailsFromToken(token);
  // create a room
  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    console.log(userId);
    const userDetails = await UserModel.findById(userId).select("-password");

    const payload = {
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      profile_pic: userDetails.profile_pic,
      online: onlineUser.has(userId),
    };
    socket.emit("message-user", payload);
  });

  //new message
  socket.on("new message", async (data) => {
    let conversation = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, reciever: data?.reciever },
        { sender: data?.reciever, reciever: data?.sender },
      ],
    });
    if (!conversation) {
      const createConversation = new ConversationModel({
        sender: data?.sender,
        reciever: data?.reciever,
      });
      conversation = await createConversation.save();
    }
    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId : data?.sender
    });

    const saveMessage = await message.save();

    const updateConversation = await ConversationModel.updateOne(
      { _id: conversation?._id },
      {
        $push: { messages: saveMessage._id },
      },
      { new: true }
    );

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, reciever: data?.reciever },
        { sender: data?.reciever, reciever: data?.sender },
      ],
    }).populate('messages').sort({updatedAt: -1})
    // console.log(getConversation)
    io.to(data?.sender).emit("message" ,getConversationMessage?.messages)
    io.to(data?.reciever).emit("message" ,getConversationMessage?.messages)


  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id.toString());
    io.emit("onlineUser", Array.from(onlineUser));
    console.log(
      "disconnected user ",
      socket.id,
      "deleted user",
      user?.name,
      "array",
      onlineUser
    );
  });
});

module.exports = {
  app,
  server,
};
