const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    pasword:{
        type:String,
        require: true,
    },
    role:{
        type: String,
        default:"user"
    }
});

const user = mongoose.model("user", userSchema);

module.exports = user;