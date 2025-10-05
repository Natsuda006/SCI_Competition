
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 text-white text-center p-8">
      {/* 404 ตัวใหญ่ พร้อม bounce animation */}
      <h1 className="text-[10rem] font-bold animate-bounce">404</h1>

      <h2 className="text-3xl mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="px-8 py-3 bg-white text-purple-500 font-bold rounded-lg hover:bg-gray-200 hover:scale-105 transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
