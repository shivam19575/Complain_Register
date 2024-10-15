const { z } = require("zod");


const loginSchema = z.object({
    email:z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(4,{message:"Email must be of atleast 4 characters"})
    .max(200,{message:"Email must not be of more than 200 characters"}),

    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"password must be atleast of 8 characters"})
    .max(200,{message:"password must not be of more than 200 characters"}),
});

// creating object schema using the zod 

const signUPSchema = loginSchema.extend({
    username:z.string({required_error:"name is required"})
    .trim()
    .min(4,{message:"name must be atleast of 4 characters"})
    .max(255,{message:"name must not be of more than 200 characters"}),
   
    phone:z.string({required_error:"phone number is required"})
    .trim()
    .min(10,{message:"phone number must of atleast 10 digits"})
    .max(14,{message:"phone number must not be of more than 14 digits"}),
 
});


module.exports = { signUPSchema, loginSchema };