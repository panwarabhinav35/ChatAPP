const UserModel = require("../models/UserModel")

async function checkEmail(req,res){
    try {
        const  {email} = req.body
        const checkEmail = await UserModel.findOne({email}).select("-password")
        if(!checkEmail){
            return res.status(404).json({message: "User not exists", error: true})
        }

        res.status(200).json(({
            message: "User found",
            data: checkEmail,
            succress: true
        }))
    } catch (error) {
        res.status(500).json({message:error, error:true})
    }
    
}
module.exports= checkEmail