const user = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register

const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  // //console.log("signup is called")
  // //console.log(userName, email, password)

  try {
    const checkUser = await user.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exitst whth the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    //console.log(hashPassword);
    const newUser = new user({
      userName,
      email,
      password: hashPassword
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login

const login = async (req, res) => {
  // console.log("login called")
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const checkUser = await user.findOne({ email });
    // console.log(checkUser)
    if (!checkUser) {
      return res.json({
        success: false,
        message: "user does not exitst ! please register first",
      });
    }

    //console.log(checkUser);
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "incorrect email or password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    //console.log("error in login : ", error);
  }
};

// logout

const logout = (req, res) =>{
  // console.log("logout called")
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out Successfully!'
  })
}

// auth MiddleWare

const authMiddleware = async(req, res, next)=>{
  const token = req.cookies.token;
  // console.log("token is : " , token);
  if(!token){
    // console.log("token not found");
    return res.status(400).json({
      success : false,
      message : 'Unauthorised user !'
    })
  }
  // console.log(process.env.CLIENT_SECRET_KEY)
  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    // console.log("decoded is : " , decoded);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log("error called ");
    res.status(401).json({
      success : false,
      message : 'Unauthorised user !'
    })
  }

}



module.exports = { signup, login, logout, authMiddleware };
