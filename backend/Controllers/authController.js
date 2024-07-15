import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d", // Corrected from 'expiredIn'
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // check if user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email }); // Corrected from 'findOnd'
    const doctor = await Doctor.findOne({ email }); // Corrected from 'findOnd'

    if (patient) {
      user = patient;
    }

    if (doctor) {
      user = doctor;
    }

    // check if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // get token if the password matches
    const token = generateToken(user);

    const { password: pwd, role, appointments, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      data: { ...rest, role },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};
