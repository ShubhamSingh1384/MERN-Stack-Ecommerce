const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth/authRoutes')

PORT = process.env.PORT || 5000;
dotenv.config({path:"./config/config.env"});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Failed to connect ", error);
  });


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    method: [ 'GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', authRouter);





app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on port : ", PORT);
    }
})