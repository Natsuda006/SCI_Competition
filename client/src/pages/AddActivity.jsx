import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ActivityService from "../services/activity.services";

const AddActivity = () => {
  const navigate = useNavigate();

  const initialActivity = {
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
  };

  const [activity, setActivity] = useState(initialActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...activity,
        team_size: activity.team_size ? parseInt(activity.team_size) : 0,
        date: activity.date ? new Date(activity.date).toISOString() : null,
        reg_open: activity.reg_open ? new Date(activity.reg_open).toISOString() : null,
        reg_close: activity.reg_close ? new Date(activity.reg_close).toISOString() : null,
      };

      const token = localStorage.getItem("accessToken");
      const newActivity = await ActivityService.createActivity(payload, token);

      if (newActivity.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Activity added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setActivity(initialActivity);
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add activity",
      });
      console.error("Error adding activity:", error);
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "ชื่อกิจกรรม", required: true },
    { label: "Description", name: "description", type: "textarea", placeholder: "คำอธิบายกิจกรรม", required: true },
    { label: "Type", name: "type", type: "text", placeholder: "ประเภทกิจกรรม" },
    { label: "Level", name: "level", type: "text", placeholder: "ระดับกิจกรรม" },
    { label: "Team size", name: "team_size", type: "number", placeholder: "จำนวนสมาชิกในทีม" },
    { label: "Date", name: "date", type: "date" },
    { label: "Venue", name: "location", type: "text", placeholder: "สถานที่จัดกิจกรรม" },
    { label: "Open", name: "reg_open", type: "date" },
    { label: "Closed", name: "reg_close", type: "date" },
    { label: "Contact Name", name: "contact_name", type: "text", placeholder: "ชื่อผู้ติดต่อ" },
    { label: "Telephone", name: "contact_phone", type: "tel", placeholder: "เบอร์โทรศัพท์" },
    { label: "Contact Email", name: "contact_email", type: "email", placeholder: "อีเมลผู้ติดต่อ" },
    { label: "Status", name: "status", type: "text", placeholder: "สถานะกิจกรรม" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">ADD ACTIVITY FORM</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="label">
                  <span className="label-text">{field.label}</span>
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={activity[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="textarea textarea-bordered w-full"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={activity[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="input input-bordered w-full"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Add Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
