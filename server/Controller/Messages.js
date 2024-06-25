const { ConversationModel } = require("../models/ConversationModel");


async function getMessages(req, res) {
    try {
      const { sender , reciever} = req.body;
        const getConversation = await ConversationModel.findOne({
            $or: [
              { sender: sender, reciever: reciever },
              { sender: reciever, reciever: sender },
            ],
          }).populate('messages').sort({updatedAt: -1})

          if(!getConversation){
            return res.status(200).json({message: "No COnversation" , data :[]})
          }
          res.status(200).json({message: "All Messages" , data :getConversation.messages , success:true})
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
      });
    }
  }
  
  module.exports = getMessages