import api from "./api";
const API_URL = import.meta.env.VITE_ACTIVITY_API;

// GET ALL
const getAllActivities = async () => {
  return api.get(API_URL);
};

// GET BY ID
const getActivityById = async (id) => {
  return api.get(`${API_URL}/${id}`);
};

// CREATE (ต้องส่ง token ใน header)
const createActivity = async (activity) => {
  const token = localStorage.getItem("accessToken");
  return api.post(API_URL, activity, {
    headers: { "x-access-token": token }
  });
};

// UPDATE BY ID
const updateActivity = async (id, activity) => {
  const token = localStorage.getItem("accessToken");
  return api.put(`${API_URL}/${id}`, activity, {
    headers: { "x-access-token": token }
  });
};

// DELETE BY ID
const deleteActivity = async (id) => {
  const token = localStorage.getItem("accessToken");
  return api.delete(`${API_URL}/${id}`, {
    headers: { "x-access-token": token }
  });
};

// SEARCH
const searchActivities = async (queryParams) => {
  const query = new URLSearchParams(queryParams).toString();
  return api.get(`${API_URL}/search?${query}`);
};

const ActivityService = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  searchActivities,
};

export default ActivityService;