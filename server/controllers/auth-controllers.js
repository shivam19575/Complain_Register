const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// home page logic is here  

const home = async(req, res) => {
  try {
    res.status(200).send("hello from home page of  controllers and router combined using another ways ");
  } catch (error) {
    console.log(error); 
  }
};

// register page logic is here 

const register = async(req, res) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
      return res.status(400).json({message:"email already Exists !"});
    }

    // now we are just hashing the password here using the bcryptjs and the salt round is about 10 

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);



   const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({ msg:"registration successful !", token:await userCreated.generateToken(), userId:userCreated._id.toString() });
  } catch (error) {
    res.status(401).json({msg:"internal server error !"});
    console.log(error);
  }
};


// user login logic is in this part of phase 
 
const login = async(req, res, next) => {
   try {
     const { email, password } = req.body;
     const userExist = await User.findOne({email});
     console.log(userExist);


     if(!userExist){
      return res.status(500).json({msg:"invalid Credentials "});
     }

    //  const user = await bcrypt.compare(password, userExist.password );
    const user = await userExist.comparePassword(password);
 
      if(user){
        res.status(200).json({
          msg:"login successful !",
          token:await userExist.generateToken(),
          userId:userExist._id.toString(),
        });
      }else{
        res.status(401).json({msg:"invalid credentails "})
      }



   } catch (error) {
    //  res.status(401).json("internal server error ");
    next(error);
   }
}

// to send user data , user logic is here only 
 
 const user = async(req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      // res.status(200).json({message : "hi user" });
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`error from the route : ${ error } `);
    }
 };





module.exports = { home, register, login, user };