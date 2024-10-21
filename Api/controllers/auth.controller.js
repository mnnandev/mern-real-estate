import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashpasswrod = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpasswrod });
  try {
    await newUser.save();
    res.status(201).json("user created successfully!!");
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validpassword = bcryptjs.compareSync(password, validUser.password);
    if (!validpassword) return next(errorHandler(404, "Invalid password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pas, ...rest } = validUser._doc; // Destructure the password out of the user object and keep the rest of the user data except password
    res
      .cookie("acces_tokken", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
