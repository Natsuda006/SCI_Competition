import express from "express";
const router = express.Router();

import activityControllers from "../controllers/activity.controllers.js";
import AuthMiddleware from "../middleware/authjwt.js";

// Create a new activity
router.post("/", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.create);

// GET all activities
router.get("/", activityControllers.getAll);

// GET activity by ID
router.get("/:id", activityControllers.getById);

// PUT update activity by ID (protected route)
router.put("/:id", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.update);

// DELETE activity by ID (protected route)
router.delete("/:id", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.delete);

// Search activities with query parameters
router.get("/search", activityControllers.search);

export default router;
