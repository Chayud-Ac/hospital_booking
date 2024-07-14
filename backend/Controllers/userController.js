import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, message: "เปลี่ยนแปลงสำเร็จ" });
  } catch (error) {
    res.status(500).json({ success: false, message: "เปลี่ยนแปลงไม่สำเร็จ" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "ไม่มีบัญชีผู้ใช้" });
  } catch (error) {
    res.status(500).json({ success: false, message: "ลบบ้ได้" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
    }

    res
      .status(200)
      .json({ success: true, message: "กำลังหาโปรไฟล์", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "มีปัญหานิดหน่อย" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // step1 ; get the appointment from the booking model

    const bookings = await Booking.find({ user: req.userId });

    // step 2 extract doctor id from the appointment bookin

    const doctorIds = bookings.map((item) => item.doctor.id);

    // step3 use the doctor id to get doctor information in the model

    const doctors = await Doctor.find({
      _id: { $in: doctorIds },
    }).select("-password");

    res
      .status(200)
      .json({ success: true, message: "ข้อมูลการนัด", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "ข้อมูลการนัด" });
  }
};
