
import React, { useState, useEffect } from "react";
import Activities from "../components/Activities";
import ActivityService from "../services/activity.services";
import Swal from "sweetalert2";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [filterActivities, setFilterActivities] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword.trim() === "") {
      setFilterActivities(activities);
      return;
    }

    const result = activities.filter((activity) =>
      ["name", "type", "level", "location"].some((field) =>
        activity[field]?.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    setFilterActivities(result);
  };

  useEffect(() => {
    const getAllActivities = async () => {
      try {
        const response = await ActivityService.getAllActivities();
        if (response.status === 200) {
          setActivities(response.data);
          setFilterActivities(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "ไม่สามารถโหลดกิจกรรมได้",
        });
        console.error("Error fetching activities:", error);
      }
    };

    getAllActivities();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          ALL Activity
        </h1>
        
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ค้นหากิจกรรม..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Activities Grid */}
      {filterActivities.length > 0 ? (
        <Activities activities={filterActivities} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          ไม่พบกิจกรรมที่ตรงกับการค้นหา
        </div>
      )}
    </div>
  );
};

export default Home;