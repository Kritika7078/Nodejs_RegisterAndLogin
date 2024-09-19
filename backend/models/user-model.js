const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

//secure the password with bcrypt 
//we create a middleware function here only

userSchema.pre("save", async function (next){
    //this keyword in pre of userSchema has blueprint of the req
    //console.log("atleast this middleware working")
    //console.log(this);
    const user=this;
    if(!user.isModified("password")){
        //console.log(" prev middleware working")
        next();
    }
    try {
        //console.log("middleware working")
        const saltRound=await bcrypt.genSalt(10);
        const hash_password =await bcrypt.hash(user.password,saltRound)
        //console.log(hash_password)
        user.password=hash_password;
    } catch (error) {
        next(error);
    }
})

//comparePassword
userSchema.methods.comparePassword = async function (password){
    //this here gives the info from the database
    return bcrypt.compare(password,this.password)
}

//json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
        
)
    } catch (error) {
        console.error(error)
    }
};

const User = new mongoose.model("User",userSchema);


module.exports=User;