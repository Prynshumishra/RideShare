import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  };
};

export const register = async (req, res, next) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({message:"Email already exists"});

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try{
    const newUser = new User({
      name: name,
      email: email,
      password: hash
    })
    await newUser.save();
    
    const accessToken = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" });

    const options = getCookieOptions();

    const { password, isAdmin, ...otherDetails } = newUser._doc;
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ user: { ...otherDetails }, isAdmin });
  }catch(err){
    next(err);
  }
}

export const login = async(req, res, next)=>{
  try{
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({email: req.body.email})

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json({message:"Wrong email or password"});
    }
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" });

    const options = getCookieOptions();

    const { password, isAdmin, ...otherDetails } = user._doc;
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ user: { ...otherDetails }, isAdmin });

  }catch(err){
    next(err);
  }
}

export const logout = async (req, res, next) => {
  try{
    res.clearCookie("accessToken", getCookieOptions());
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};