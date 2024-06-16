const UserModel = require("../models/UserModel");

async function searchUser(req, res) {
  try {
    const { searchedText } = req.body;
    let searchUser = [];
    if(searchedText===""){
        return res.status(200).json({message: "Users Found", data:searchUser , success:true});
    }
    searchUser = await UserModel.find({
      $or: [
        { name: { $regex: searchedText, $options: "i" } },
        { email: { $regex: searchedText, $options: "i" } },
      ],
    }).select("-password");
    res.status(200).json({message: "Users Found", data:searchUser , success:true});
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error:true
    });
  }
}

module.exports = searchUser;
