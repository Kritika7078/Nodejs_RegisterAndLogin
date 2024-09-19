const User = require("../models/user-model");
const bcrypt = require('bcrypt')

const home = async(req,res)=>{
    try {
        res.status(200).send("home page")
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const register= async(req,res)=>{
    try{
        const {username,email,phone,password}=req.body;
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(400).json({message:"email already exists"})
        }

        //const saltRound=10;
        //const hash_password = await bcrypt.hash(password,saltRound)

       const userCreated= await User.create({username,email,phone,password})
        res.status(200).json({msg:"registeration successful",
                              data:userCreated,
                              token: await userCreated.generateToken(),
                              userId:userCreated._id.toString()});
    }
    catch(error){
        next(error);
       // return res.status(500).send({error:error.message})
    }
} 

const login=async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Invalid credentials"})
        }

        //const user= await bcrypt.compare(password,userExist.password)
        const user = await userExist.comparePassword(password)
        if(user){
            res.status(200).json({
                msg:"login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        }
            else {
                const error = 
                    {status:401,
                     message:"invalid email or password"}
                next(error);
               res.status(401).json({message:"invalid email or password"})
            }
       

    } catch (error) {
        next(error);
        //return res.status(500).send({error:error.message})
    }
}

const user =async (req,res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log("error from the user route")
    }
}

module.exports={home,register,login,user}