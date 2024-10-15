const { Schema } = require("zod");

const validate = (Schema) => async(req, res, next) => {
  try {
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // console.log(err);

    const status = 422;
    const message = "fill the input properly";
    const extraDetails = err.errors[0].message;

     const error = {
      status,
      message,
      extraDetails,
     };

    console.log(error);
    // res.status(400).json({message: message});
    next(error);
  }
};



module.exports = validate;