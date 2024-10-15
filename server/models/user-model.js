const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique: true,
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    phone:{
        type:String,
        require:true,
        unique: true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});


// this is the another way of securing the password one way has been commended in auth-router js file with the comment !

userSchema.pre("save", async function(next){
//   console.log("pre method",this);

const user = this;

if(!user.isModified("password")){
    next();
}

try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
} catch (error) {
   next(error);
}

});

// comparing the password here using the instance function 

userSchema.methods.comparePassword = async function (password) {
  return  bcrypt.compare(password, this.password );
};




// json web token which is used for authentication and authorization !
// they don't store themself in the database instead they are stored iin the form of the cookies and the local storage for later use !
// they are always issued by the server 


//  note using this method we can create many functions and it can be accesed in any file using this methods
 userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
         process.env.JWT_CONFIDENTIAL_KEY,
         {
           expiresIn:"30d",
         }
        );
    } catch (error) {
        console.error(error);
    }
 };

// define the model name and the collection name ! 
const User = new mongoose.model("User", userSchema);


module.exports = User;