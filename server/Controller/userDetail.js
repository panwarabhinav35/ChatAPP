const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

async function userDetails(req,res){
    try {
        const token  = req.body.token ||""
        const user  = await getUserDetailsFromToken(token)
        res.status(200).json({message:"user details",data:user , success:true})
    } catch (error) {
        res.status(500).json({message:error.message, error:true})
    }
}

module.exports= userDetails