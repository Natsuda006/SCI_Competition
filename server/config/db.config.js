import dotenv from "dotenv";
dotenv.config();

const config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  PORT: parseInt(process.env.DBPORT), // ✅ สำคัญ!
  dialect: process.env.DIALECT,
  pool: {
    max: 5,          // จำนวน connection สูงสุด
    min: 0,          // จำนวน connection ขั้นต่ำ
    acquire: 30000,  // เวลา (ms) รอ connection ก่อน timeout
    idle: 10000,     // ปล่อย idle นานแค่ไหนก่อนปิด connection
  },
  ssl: true, // Always use SSL for secure connection
};

export default config;
