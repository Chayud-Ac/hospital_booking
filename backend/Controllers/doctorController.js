import Doctor from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import bcrypt from "bcrypt";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    email,
    phone,
    bio,
    gender,
    specialization,
    ticketPrice,
    qualifications,
    experiences,
    timeSlots,
    about,
  } = req.body;

  // Handle photo upload
  const photo = req.file ? req.file.path : req.body.photo;

  try {
    const updatedData = {
      name,
      email,
      phone,
      bio,
      gender,
      specialization,
      ticketPrice,
      qualifications,
      experiences,
      timeSlots, // Directly use the timeSlots from req.body
      about,
      photo,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "สำเร็จ",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "ไม่สำเร็จ", error });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "ลบสำเร็จ" });
  } catch (error) {
    res.status(500).json({ success: false, message: "ลบไม่สำเร็จ" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res
      .status(200)
      .json({ success: true, message: "เจอบัญชีผู้ใช้", data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: "ไม่เจอบัญชีผู้ใช้" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res
      .status(200)
      .json({ success: true, message: "เจอบัญชีผู้ใช้", data: doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: "ไม่เจอบัญชีผู้ใช้" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
    }

    const appointments = await Appointment.find({ doctor: doctorId }).populate(
      "user",
      "name gender"
    );

    return res.status(200).json({
      success: true,
      message: "กำลังหาโปรไฟล์",
      data: { ...doctor._doc, appointments },
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "มีปัญหานิดหน่อย" });
    }
  }
};

export const updateDoctorTimeSlot = async (req, res) => {
  const { doctorId } = req.params;
  const { timeSlot, available } = req.body;

  try {
    const doctorData = await Doctor.findById(doctorId);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "ไม่เจอบัญชีผู้ใช้" });
    }

    const slotIndex = doctorData.timeSlots.findIndex(
      (slot) => slot.time === timeSlot
    );
    if (slotIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "ช่วงเวลานี้ไม่ว่าง" });
    }

    doctorData.timeSlots[slotIndex].available = available;
    await doctorData.save();

    res
      .status(200)
      .json({ success: true, message: "อัปเดตช่วงเวลาว่างสำเร็จ" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDoctor = async (req, res) => {
  const {
    email,
    password,
    name,
    phone,
    photo,
    ticketPrice,
    specialization,
    qualifications,
    experiences,
    bio,
    about,
    timeSlots,
  } = req.body;

  try {
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "อีเมลถูกใช้งานแล้ว" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    const newDoctor = new Doctor({
      email,
      password: hashPassword,
      name,
      phone,
      photo,
      ticketPrice,
      specialization,
      qualifications,
      experiences,
      bio,
      about,
      timeSlots,
      role: "doctor", // Set role to doctor
      isApproved: "approved", // Default status
    });

    // Save doctor to the database
    const savedDoctor = await newDoctor.save();

    res.status(201).json({
      success: true,
      message: "สำเร็จ",
      data: savedDoctor,
    });
  } catch (error) {
    console.error("มีปัญหา", error);
    res.status(500).json({ success: false, message: "สำเร็จ" });
  }
};
