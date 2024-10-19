import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const SignUp = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashpasswrod = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpasswrod });
  try {
    await newUser.save();
    res.status(201).json("user created successfully!!");
  } catch (error) {
    next(error)
  }
};
