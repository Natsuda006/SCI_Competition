import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/auth.routers.js";
import db from "./models/index.js";
import ActivityRouter from "./routers/activity.routers.js";
const sequelize = db.sequelize;
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected established successfully");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    if(NODE_ENV === 'development'){
      await db.sequelize.sync({ alter: true });
      console.log("Database Synced in development mode");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initDataBase();
// //สร้าง role หากยังไม่มี
// const initRole = async () => {
//   try {
//   await Role.create({ id: 1, name: "admin" });
//   await Role.create({ id: 2, name: "manager" });
//   await Role.create({ id: 3, name: "teacher" });
//   await Role.create({ id: 4, name: "judge" });
//     console.log("Roles created.");
//   } catch (error) {
//     console.error("Error creating roles:", error);
//   }
// };

// // sync database (ไม่ลบข้อมูลเดิม)
// sequelize.sync().then(async () => {
//   console.log("Database synced");
//   await initRole();
// }).catch((err) => {
//   console.error("Database sync error:", err);
// });

// Routes
app.get("/", (req, res) => {
  res.send("SCI_Competiton API");
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/activities", ActivityRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});