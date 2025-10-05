import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            กรุณาเข้าสู่ระบบก่อน
          </h1>
          <button
            className="mt-6 w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all shadow-md hover:shadow-lg"
            onClick={() => navigate("/signin")}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          ข้อมูลผู้ใช้
        </h1>

        <div className="space-y-5">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">ชื่อ</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.name}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">อีเมล</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">ประเภท</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.type}</p>
          </div>

          {user.type === "teacher" && (
            <>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">โรงเรียน</label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{user.school}</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">เบอร์โทรศัพท์</label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{user.phone}</p>
              </div>
            </>
          )}

      <button
  onClick={() => navigate("/")}
  className="mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all shadow-md hover:shadow-lg"
>
  กลับหน้าแรก
</button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
