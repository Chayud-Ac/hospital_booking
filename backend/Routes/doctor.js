import express from "express";

import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
  getDoctorProfile,
  updateDoctorTimeSlot,
  createDoctor,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.put("/:id", authenticate, restrict(["admin", "doctor"]), updateDoctor);
router.post("/:id", authenticate, restrict(["admin", "doctor"]), createDoctor);

router.post("/:id", authenticate, restrict(["admin", "doctor"]), deleteDoctor);
router.get("/", getAllDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.put(
  "/:doctorId/timeslots",
  authenticate,
  restrict(["admin", "doctor"]),
  updateDoctorTimeSlot
);

export default router;
