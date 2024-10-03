const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

PORT = process.env.PORT || 5000;
dotenv.config({path:"./config/config.env"});

mongoose.connect(process.env.DB_URL)
.then((res) => {
    console.log("MongoDB connected");
})
.catch((err)=> console.log(err))


const app = express();

app.use(cors({
    origin: 'http://localhost:5173/',
    method: [ 'GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credential: true
}));

app.use(cookieParser());
app.use(express.json());



app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on port : ", PORT);
    }
})