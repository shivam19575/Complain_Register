const Complain = require("../models/complain-model");

const Complains = async(req,res) =>{
 try {
    console.log("This is the complain request : ",req.body);

    const { username , email , complain } = req.body;

    const complainRegistered = await Complain.create({ username, email, complain });
    
    res.status(201).json({msg: "Complain Registered Successfully "});
 } catch (error) {
    console.log("Error from the backend complain section is : ",error);
    
 }
};

const AllComplains = async(req,res,next) =>{
    try {
        const AllComplains = await Complain.find({});
        console.log("This is the list of all complains: ",AllComplains);
        if(!AllComplains || AllComplains.length === 0){
            return res.status(404).json({message:"No Complains Found "});
         }else{
           return res.status(200).json(AllComplains);
         }
        
    } catch (error) {
        console.log("Error from the backend complain View section is : ",error);
    
    }
}

module.exports = { Complains ,AllComplains};