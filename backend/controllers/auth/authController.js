const user = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register

const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  // console.log("signup is called")
  // console.log(userName, email, password)

  try {
    const checkUser = await user.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exitst whth the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new user({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await user.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "user does not exitst ! please register first",
      });
    }

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
      { expiresIn: "1d" }
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
    console.log("error in login : ", error);
  }
};

module.exports = { signup, login };
