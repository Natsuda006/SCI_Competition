import express from "express";
const router = express.Router();
import authControllers from "../controllers/auth.controllers.js";

// POST http://localhost:5001/api/v1/auth/signup
router.post("/signup", authControllers.signUp);

// POST http://localhost:5001/api/v1/auth/signin
router.post("/signin", authControllers.signIn);

export default router;
