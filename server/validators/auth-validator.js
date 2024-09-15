const {z}=require("zod")

//creating object schema for sign up
const loginSchema = z.object({
    email:z.string({required_error:"email is required"}).trim().email({message:"invalid email address"}).min(3,{message:"name must have atleast 3 letters" }).max(255,{message:"name must not be more than 255 letters"}),
    password:z.string({required_error:"password is required"}).min(7,{message:"password must have atleast 7 characters" }).max(1024,{message:"name must not be more than 1024 characters"}),
})
const signupSchema = loginSchema.extend({
    username:z.string({required_error:"name is required"}).trim().min(3,{message:"name must have atleast 3 letters" }).max(255,{message:"name must not be more than 255 letters"}),
    phone:z.string({required_error:"phone is required"}).trim().min(10,{message:"phone must have atleast 10 digits" }).max(20,{message:"name must not be more than 20 digits"}),
})

module.exports={signupSchema,loginSchema};