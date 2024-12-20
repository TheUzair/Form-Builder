import express from "express";
import comprehensionRoutes from "./comprehensionRoutes.js";
import clozeRoutes from "./clozeRoutes.js";
import categorizeRoutes from "./categorizeRoutes.js";

const router = express.Router();

router.use("/comprehension", comprehensionRoutes);
router.use("/cloze", clozeRoutes);
router.use("/categorize", categorizeRoutes);

export default router;
