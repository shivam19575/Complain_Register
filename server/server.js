
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./Router/auth-router");
const complainRoute = require("./Router/complain-router");


const connectDb = require("./Utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const { Schema, model, default: mongoose } = require("mongoose");

// lets tackle cors here only !

const corsOptions = {
    origin: "http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials:true,
};

app.use(cors(corsOptions));

app.use(express.json({limit:"100mb"}));

app.use("/api/auth", authRoute);

app.use("/api/register",complainRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV = "production"){
  app.use(express.static("client/dist"));
}


connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`server is running on port no :${PORT}`);
 });
});

