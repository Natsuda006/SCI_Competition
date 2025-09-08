import express from "express";
const router = express.Router();

import activityControllers from "../controllers/activity.controllers.js";
import AuthMiddleware from "../middleware/authjwt.js";

//create a new activity router
router.post("/", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.createActivity);

// GET all activities
router.get("/", activityControllers.getAllActivities);

// GET activity by ID
router.get("/:id", activityControllers.getActivityById);

// PUT update activity by ID (protected route)
router.put("/:id", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.updateActivity);

// DELETE activity by ID (protected route)
router.delete("/:id", [AuthMiddleware.verifyToken, AuthMiddleware.isManager], activityControllers.deleteActivity);

// Search activities with query parameters
router.get("/serch", activityControllers.serchActivities);

export default router;