import express from "express";

import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["admin , doctor"]), getSingleUser);
router.post("/:id", updateUser, restrict(["admin , doctor"]), updateUser);
router.post("/:id", deleteUser, restrict(["admin , doctor"]), deleteUser);
router.get("/", getAllUser, restrict(["admin , doctor"]), getAllUser);

export default router;
