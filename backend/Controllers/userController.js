import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = { ...req.body };

  // Check if the password is empty, null, or undefined
  if (!updateData.password) {
    delete updateData.password;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
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
    // Set the user as inactive rather than deleting
    await User.findByIdAndUpdate(id, { isActive: false });
    res
      .status(200)
      .json({ success: true, message: "User account deactivated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to deactivate user" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById({ _id: id, isActive: true }).select(
      "-password"
    );
    if (user) {
      res
        .status(200)
        .json({ success: true, message: "บัญชีผู้ใช้", data: user });
    } else {
      res.status(404).json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: "ไม่มีบัญชีผู้ใช้" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("-password");
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
