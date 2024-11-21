const express = require('express');
const { 
    signup, 
    login,
    logout,
    authMiddleware
} = require('../../controllers/auth/authController');




const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/checkauth', authMiddleware, (req, res)=>{
    const user = req.user;
    // console.log(user);
    res.status(200).json({
        success : true,
        message : "Authenticated user!",
        user
    });
});


module.exports = router