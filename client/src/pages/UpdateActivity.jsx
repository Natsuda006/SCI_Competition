// src/pages/UpdateActivity.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import ActivityServices from "../services/activity.services"; // สมมติมี service สำหรับ API

const UpdateActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ดึง id ของกิจกรรมจาก route
  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: "",
    date: "",
    location: "",
    reg_open: "",
    reg_close: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: ""
  });

  // ดึงข้อมูลกิจกรรมจาก backend
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await ActivityServices.getActivityById(id);
        setActivity(res.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถโหลดข้อมูลได้",
          text: error.message
        });
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ActivityServices.updateActivity(id, activity);

      Swal.fire({
        icon: "success",
        title: "กิจกรรมถูกแก้ไขแล้ว",
        showConfirmButton: false,
        timer: 1500
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "แก้ไขกิจกรรมไม่สำเร็จ",
        text: error.message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          แก้ไขกิจกรรม
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">ชื่อกิจกรรม</label>
            <input
              type="text"
              name="name"
              value={activity.name}
              onChange={handleChange}
              placeholder="ชื่อกิจกรรม"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">คำอธิบายกิจกรรม</label>
            <textarea
              name="description"
              value={activity.description}
              onChange={handleChange}
              placeholder="คำอธิบายกิจกรรม"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">ประเภทกิจกรรม</label>
            <input
              type="text"
              name="type"
              value={activity.type}
              onChange={handleChange}
              placeholder="ประเภทกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">ระดับกิจกรรม</label>
            <input
              type="text"
              name="level"
              value={activity.level}
              onChange={handleChange}
              placeholder="ระดับกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">ขนาดทีม</label>
            <input
              type="number"
              name="team_size"
              value={activity.team_size}
              onChange={handleChange}
              placeholder="จำนวนสมาชิกในทีม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">วันที่จัดกิจกรรม</label>
            <input
              type="date"
              name="date"
              value={activity.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">สถานที่จัดกิจกรรม</label>
            <input
              type="text"
              name="location"
              value={activity.location}
              onChange={handleChange}
              placeholder="สถานที่จัดกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Registration Open */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">วันที่เปิดรับสมัคร</label>
            <input
              type="date"
              name="reg_open"
              value={activity.reg_open}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Registration Close */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">วันที่ปิดรับสมัคร</label>
            <input
              type="date"
              name="reg_close"
              value={activity.reg_close}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">ชื่อผู้ติดต่อ</label>
            <input
              type="text"
              name="contact_name"
              value={activity.contact_name}
              onChange={handleChange}
              placeholder="ชื่อผู้ติดต่อ"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">เบอร์โทรศัพท์ผู้ติดต่อ</label>
            <input
              type="tel"
              name="contact_phone"
              value={activity.contact_phone}
              onChange={handleChange}
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">อีเมลผู้ติดต่อ</label>
            <input
              type="email"
              name="contact_email"
              value={activity.contact_email}
              onChange={handleChange}
              placeholder="อีเมลผู้ติดต่อ"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">สถานะกิจกรรม</label>
            <input
              type="text"
              name="status"
              value={activity.status}
              onChange={handleChange}
              placeholder="สถานะกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateActivity;