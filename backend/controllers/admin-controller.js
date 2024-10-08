const User = require("../models/user-model")
const Contact= require("../models/contact-model")


const getAllUsers=async(req,res)=>{
try {
    const users=await User.find({},{password:0});
    if(!users || users.length===0){
        return res.state(404).json({message:"NO Users Found"});
    }
    return res.status(200).json(users)
} catch (error) {
    next(error);
}
}

const getAllContacts=async(req,res)=>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length===0){
            return res.state(404).json({message:"NO Contacts Found"});
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

const deleteUserById=async ( req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        res.status(200).json({message:"User deleted successfully"}) 
    } catch (error) {
        
        console.log(error)
        //next(error)
    }
}

const updateUserById=async ( req,res)=>{
    let id=req.params.id;
    console.log(id)
    try {
        const id=req.params.id;
        const updatedUserData = req.body;
        const updatedUser = await User.updateOne({_id:id},{$set:updatedUserData});
       
        res.status(200).json(updatedUser) 
    } catch (error) {
        console.log(error)
       // next(error)
    }
}



const getUserById=async ( req,res)=>{
    let id=req.params.id;
    console.log(id)
    try {
        const id=req.params.id;
        const data = await User.findOne({_id:id},{password:0});
        console.log(data)
        res.status(200).json(data) 
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteContactById=async ( req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        res.status(200).json({message:"Contact deleted successfully"}) 
    } catch (error) {
        
        console.log(error)
        //next(error)
    }
}

module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};