const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const registerUser = require("./registerUSer");
const jwt  =  require('jsonwebtoken')

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    const verifyPassword = await bcryptjs.compare(password, user.password)
    
    if (!verifyPassword) {
        return res.status(404).json({ message: "Check Password", error: true });
    }
    const tokenData={
        id:user._id,
        email:user.email
    }
    const token  = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn: '1d'})
    const cookieOption = {
        http:true,
        secure:true
    }
    res.cookie('token', token , cookieOption).status(200).json({
      message: "LoggedIn successfully",
      data: user,
      token:token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, error: true });
  }
}
module.exports = checkPassword;
