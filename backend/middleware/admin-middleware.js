

const adminMiddleware = async (req,res,next)=>{
    try {
        const adminRole=req.user.isAdmin;
        if(!adminRole){
            return  res.status(403).json({message:"access denied user is not an admin"})
        }
        //res.status(200).json(req.user.isAdmin)
        //to move to get all functions
        next();
    } catch (error) {
        next(error)
    }
}

module.exports=adminMiddleware