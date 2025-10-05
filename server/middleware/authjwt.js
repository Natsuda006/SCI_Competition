import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.User;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    
    console.log("Auth Middleware - Token received:", token);

    if (!token) {
        console.log("Auth Middleware - No token provided");
        return res.status(403).send({ message: "No Token Provided!" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            console.log("Auth Middleware - Token verification failed:", err);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("Auth Middleware - Token decoded:", decoded);
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                console.log("Auth Middleware - User not found for ID:", req.userId);
                return res.status(404).send({ message: "User not found!" });
            }
            
            console.log("Auth Middleware - User found:", user.type);

            if (user.type === "admin") {
                console.log("Auth Middleware - User is admin, allowing access");
                return next(); 
            }

            console.log("Auth Middleware - User is not admin, denying access");
            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            console.log("Auth Middleware - Error checking user role:", error);
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const isTeacher = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            if (user.type === "teacher") {
                return next(); 
            }

            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const isJudge = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            if (user.type === "judge") {
                return next(); 
            }

            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const authJwt = { verifyToken ,isAdmin , isTeacher,isJudge};

export default authJwt;