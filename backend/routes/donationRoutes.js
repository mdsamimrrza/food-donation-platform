import express from "express";
import { createDonation, getDonations, updateDonationStatus } from "../controllers/donationController.js";

const router = express.Router();

import authMiddleware from '../middleware/authMiddleware.js';
import donationMiddleware from '../middleware/donationMiddleware.js'

router.post('/',authMiddleware,createDonation);

router.get("/",authMiddleware , donationMiddleware , getDonations);
router.put("/:id", authMiddleware , updateDonationStatus);

export default router;
