const jwt = require("jsonwebtoken");
const User = require("../models/user-model");



const authMiddleware = async(req, res, next) => {
  const token = req.header("Authorization");

  if(!token) {

    // if we  attemp to use expired token , you  will recive an error of 401

    res.status(401).json({message: "Unauthorized HTTP, Token not provided"});

  }
 
  console.log("token from auth middleware : ",token);
//   assuming that the token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"

  const jwtToken = token.replace("Bearer","").trim();
  console.log("token from auth middleware after trimming :",jwtToken);

  try {

    const isVerified = jwt.verify(jwtToken, process.env.JWT_CONFIDENTIAL_KEY);
    // console.log(isVerified);
    
    const userData = await User.findOne({ email:isVerified.email }).select({
        password: 0,
    });
    console.log(userData);
   
     req.user = userData;
     req.token = token;
     req.userID = userData._id;

    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
  }

 
};



module.exports = authMiddleware;