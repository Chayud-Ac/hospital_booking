import express from "express";

import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.post("/:id", restrict(["admin", "doctor"]), authenticate, updateDoctor);
router.post("/:id", restrict(["admin", "doctor"]), authenticate, deleteDoctor);
router.get("/", getAllDoctor);

export default router;
