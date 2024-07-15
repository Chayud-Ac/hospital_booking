import Doctor from "../models/DoctorSchema.js";
import User from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";

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
    // No need to reformat timeSlots here as they should already be in the correct format
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
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update", error });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to delete" });
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
      .json({ success: true, message: "User found", data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
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
      .json({ success: true, message: "Users found", data: doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

// response object of req doctor data base on the id from the frontend
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
    }

    const appointments = await Appointment.find({ doctor: doctorId });

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
