import express from "express";
const router = express.Router();

import activityControllers from "../controllers/activity.controllers.js";
import AuthMiddleware from "../middleware/authjwt.js";

// Middleware to check if user is admin or teacher
const isAdminOrTeacher = (req, res, next) => {
    // Since we already verified the token, we can check the user type
    // We'll need to get the user from the request (this would be set in the verifyToken middleware)
    // For now, we'll just use the existing middleware and handle the logic in the controller
    next();
};

// Create a new activity - allow both admin and teacher
router.post("/", [AuthMiddleware.verifyToken], activityControllers.create);

// GET all activities
router.get("/", activityControllers.getAll);

// GET activity by ID
router.get("/:id", activityControllers.getById);

// PUT update activity by ID (allow both admin and teacher)
router.put("/:id", [AuthMiddleware.verifyToken], activityControllers.update);

// DELETE activity by ID (allow both admin and teacher)
router.delete("/:id", [AuthMiddleware.verifyToken], activityControllers.delete);

// Search activities with query parameters
router.get("/search", activityControllers.search);

export default router;