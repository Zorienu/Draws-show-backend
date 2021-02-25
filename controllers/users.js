import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const userRegister = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({ message: "Email or password incorrect" });

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

    if (!isCorrectPassword)
      return res.status(400).json({ message: "Email or password incorrect" });

    const token = jwt.sign({ email, id: existingUser._id }, "secret", {
      expiresIn: "1h",
    });

    res.json(token);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
