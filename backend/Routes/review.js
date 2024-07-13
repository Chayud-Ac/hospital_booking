import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewsController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllReviews);
router.route("/").post(authenticate, createReview);

export default router;
