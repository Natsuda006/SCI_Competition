import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; // เข้ารหัสผ่าน
import jwt from "jsonwebtoken"; // สร้าง token
import config from "../config/auth.config.js"; // นำเข้า config สำหรับ JWT
//import Operator
import { Op } from "sequelize";

const authControllers = {};

authControllers.signUp = async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).send({ message: "Username, Name, Email or Password can not be empty!" });
    }

    // Check if username already exists
    await User.findOne({ where: { username: username } }).then(async user => {
        if (user) {
            res.status(400).send({ message: "Username already exists!" });
            return;
        }

        const newUser = {
            username,
            name,
            email,
            password: bcrypt.hashSync(password, 8), // Hash the password
        };

        User.create(newUser).then((user) => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: { [Op.or]: req.body.roles }
                    }
                }).then((roles) => {
                    if (roles.length === 0) {
                        Role.findOne({ where: { name: "user" } }).then((role) => {
                            if (role) {
                                user.setRoles([role.id]).then(() => {
                                    res.send({ message: "User registered successfully!" });
                                });
                            } else {
                                res.status(500).send({ message: "Default role 'user' not found." });
                            }
                        });
                    } else {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    }
                });
            } else {
                Role.findOne({ where: { name: "user" } }).then((role) => {
                    if (role) {
                        user.setRoles([role.id]).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    } else {
                        res.status(500).send({ message: "Default role 'user' not found." });
                    }
                });
            }
        });
    });
};

authControllers.signIn = async (req, res) => {
    const { username, password } = req.body;    
    if (!username || !password) {
        res.status(400).send({ message: "Username or Password can not be empty!" });
        return;
    }

    // Check if user exists
    await User.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found!" });
            return;
        }

        // Check password
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            res.status(401).send({ message: "Invalid Password!" });
            return;
        }

        // Create token
        const token = jwt.sign(
            { username: user.username },
            config.secret,
            { expiresIn: 86400 } // 60sec * 60min * 24h
        );

        const authorities = [];
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase()); // แก้จาก authControllers.push → authorities.push
            }
            
            // ส่ง response หลังดึง roles สำเร็จ
            res.status(200).send({
                token: token,
                authorities: authorities,
                userInfo: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                },
            });
        });

    }).catch((error) => {
        res.status(500).send({ message: error.message });
    });
};


export default authControllers;
