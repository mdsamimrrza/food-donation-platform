import express from "express";
import { getDonors, getReceivers, manageDonations } from "../controllers/adminController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/donors", adminMiddleware, getDonors);
router.get("/receivers", adminMiddleware, getReceivers);
router.put("/donations/:id", adminMiddleware, manageDonations);

export default router;
