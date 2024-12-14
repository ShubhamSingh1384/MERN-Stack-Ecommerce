const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth/authRoutes')
const adminProductRouter = require('./routes/admin/productsRoutes')
const shopProductsRouter = require('./routes/shop/productsRoutes')
const shopCartRouter = require('./routes/shop/cartRoutes')
const shopAddressRouter = require('./routes/shop/addressRoutes')

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
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter)
app.use('api/shop/address', shopAddressRouter)





app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on port : ", PORT);
    }
})