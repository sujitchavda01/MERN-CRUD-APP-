import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:"*",
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:"Content-Type,Authorization",

}));
dotenv.config();


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;



mongoose.connect(URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected successfully");
        app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use("/api", route);