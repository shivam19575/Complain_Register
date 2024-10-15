const mongoose = require("mongoose");


const complainSchema = new mongoose.Schema({
    username: {
        type:String,
        require : true,
    },
    email:{
        type: String,
        require:true,   
    },
    complain:{
        type:String,
        require: true,
    },
});

// define the model name and the collection name for complains ! 
const Complain = new mongoose.model("Complain", complainSchema);

module.exports = Complain;