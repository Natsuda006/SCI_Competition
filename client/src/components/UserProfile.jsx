import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import AuthServices from "../services/auth.service"; // ✅ import ให้ด้วย

const UserProfile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // ✅ ฟังก์ชัน logout ที่ทำงานได้จริง
  const handleLogout = () => {
    AuthServices.logout(); 
    setOpen(false);       
    navigate("/login");    
  };

  return (
    <div className="relative flex justify-center">
      {/* ปุ่มรูปโปรไฟล์ */}
      <div
        className="avatar cursor-pointer transition-transform hover:scale-110"
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-lg">
          <img
            src={
              user?.photo ||
              "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
            }
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Dropdown เมนู */}
      {open && (
        <div className="absolute top-full mt-2 right-0 w-52 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-xl z-20 flex flex-col py-2">
          <button
            className="btn btn-ghost justify-start normal-case text-left hover:bg-blue-100 dark:hover:bg-blue-600 transition"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            View Profile
          </button>

          <button
            className="btn btn-ghost justify-start normal-case text-left hover:bg-blue-100 dark:hover:bg-blue-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
