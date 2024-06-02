async function logout(req,res){
    try {
        const cookieOption = {
            http:true,
            secure:true
        }
        res.cookie('token', "" , cookieOption).status(200).json({message:"session out" , success :true})
    } catch (error) {
        res.status(500).json({messsage:error , error:true})
    }
}
module.exports = logout