import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// create reviews

export const createReview = async (req, res) => {
  // เมคชัวว่า user กำหนด id ของหมอ ถ้า ใน body มันไม่มีข้อมูลของคุณหมอ
  // เราจะ set doctorId ให้ตรงกับ id ของ url ที่ user อยู่  ../../doctors/id
  if (!req.body.doctor) {
    req.body.doctor = req.params.doctorId;
  }
  if (!req.body.user) {
    req.body.user = req.userId;
  }

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submit", data: savedReview });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "failed to submit review",
    });
  }
};
