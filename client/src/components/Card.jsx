import React from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/AuthContext";
import ActivityService from "../services/activity.services";
import { useNavigate, Link } from "react-router";

const Card = (props) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const formattedDate = new Date(props.date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusColors = {
    active: "badge badge-success",
    draft: "badge badge-warning",
    closed: "badge badge-error",
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "การลบกิจกรรมนี้จะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await ActivityService.deleteActivity(props.id, token);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          text: "กิจกรรมถูกลบเรียบร้อยแล้ว",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถลบได้",
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <h2 className="card-title text-lg font-bold border-b pb-2 mb-3 text-gray-900 dark:text-gray-100">
        {props.title}
      </h2>

      {/* Details */}
      <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
        <p><span className="font-semibold">ประเภท:</span> {props.type}</p>
        <p><span className="font-semibold">ระดับ:</span> {props.level}</p>
        <p><span className="font-semibold">วันที่:</span> {formattedDate}</p>
        <p><span className="font-semibold">สถานที่:</span> {props.location}</p>
        <p><span className="font-semibold">จำนวนสมาชิก:</span> {props.team_size}</p>
        <p>
          <span className="font-semibold">สถานะ:</span>{" "}
          <span className={statusColors[props.status] || "badge badge-outline"}>
            {props.status}
          </span>
        </p>
        <p className="text-xs">
          <span className="font-semibold">ผู้ติดต่อ:</span> {props.contact_name} | {props.contact_phone} | {props.contact_email}
        </p>
      </div>

      {/* Action Buttons */}
      {(user?.type === "admin") && (
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <button onClick={handleDelete} className="btn btn-error btn-sm">
            ลบ
          </button>
          <Link to={`/update-activity/${props.id}`} className="btn btn-primary btn-sm text-center">
            แก้ไข
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;
