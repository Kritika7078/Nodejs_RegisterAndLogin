//here first we will see if logged in or not (check the token is present or not) then we will pass the req.user from here

//jwt will be verified here
const jwt = require("jsonwebtoken");
const User = require("../models/user-model")

const authMiddleware=async (req,res,next)=>{
    const token=req.header('Authorization');

    if(!token){
        //if you attempt to use an expired token error occurs
        return res.status(400).json({message:"Unauthorised HTTP,Token not provided "});
    }

     console.log("token from auth middleware ",token);  

    //assuming token is in the format "Bearer <jwt token>,Removing the "bearer" prefix"
    //trim is used to remove all the spaces present in between

    const jwtToken = token.replace("Bearer","").trim();
    console.log("token from auth middleware ",jwtToken); 

    try {
        //isVerified gets all theinfo wwhich is in the generate token schema
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        console.log(isVerified);

        //select will exclude the password from being passed
        const userData = await User.findOne({email:isVerified.email}).select({
            password:0,
        })
        console.log(userData);

        // in express.js req object is the one that contains info about the http request.
        //By adding custom properties to req,you can pass info btw middleware functions or make it available in your route handler
        req.user=userData; //here userData is comple user info password ko chod ke
        req.token = token;
        req.userID=userData._id
    
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorised. Invalid token. "})
    }

}

module.exports = authMiddleware;