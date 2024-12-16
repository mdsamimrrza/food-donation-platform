import express from "express";
import { createDonation, getDonations, updateDonationStatus } from "../controllers/donationController.js";

const router = express.Router();

import authMiddleware from '../middleware/authMiddleware.js';

router.post('/', authMiddleware, createDonation);

router.get("/", getDonations);
router.put("/:id", updateDonationStatus);

export default router;
