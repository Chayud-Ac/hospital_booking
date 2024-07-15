import express from "express";

import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["admin , doctor"]), getSingleUser);
router.post("/:id", deleteUser, restrict(["admin , doctor"]), deleteUser);
router.get("/", getAllUser, restrict(["admin , doctor"]), getAllUser);

router.get("/profile/me", authenticate, getUserProfile);
router.put("/:id", updateUser, updateUser);

export default router;
