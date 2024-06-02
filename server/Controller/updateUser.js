const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    if(!user._id){
        return res.status(400).json({message:"You are logged out"})
    }

    const { name, profile_pic } = req.body;

    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      { name, profile_pic },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "user updated", data: updateUser, success: true });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
