
const adminMiddleware = async(req, res, next) => {
    try {
      console.log("This is the data in admin part: ",req.user);
      const adminRole = req.user.isAdmin;
      if(!adminRole){
          return res.status(403).json({message:"Access denied. user is not an admin"});
      // }else{
      //    res.status(200).json({message:"admin access granted "});
      // }

  
      // if user is an admin then he will be  poceeded into next middleware for the the aunthenication !
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  
  
  
  module.exports = adminMiddleware;