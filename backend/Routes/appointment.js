import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  getAppointmentsForUser,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", authenticate, createAppointment);
router.get("/", authenticate, getAppointments);
router.delete(
  "/:id",
  authenticate,
  restrict(["admin", "doctor", "user"]),
  deleteAppointment
);
router.get("/appointment", authenticate, getAppointmentsForUser);

export default router;
