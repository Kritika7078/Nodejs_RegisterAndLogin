const mongoose=require("mongoose");

const mongodbUrl=process.env.MONGODB_URI;

const connectDb= async ()=>{
    try {
        await mongoose.connect(mongodbUrl);
        console.log("db connected")
    } catch (error) {
        console.error("db connection failed");
        proccess.exit(0);
    }
}

module.exports = connectDb