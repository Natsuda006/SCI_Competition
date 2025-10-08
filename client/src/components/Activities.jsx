// src/components/Activities.jsx
import React from "react";
import Card from "./Card";
import { useAuthContext } from "../contexts/AuthContext";

const Activities = ({ activities }) => {
  const { user } = useAuthContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {activities && user ? (
        activities.map((activity) => (
          <Card
            key={activity.id}
            id={activity.id}
            title={activity.name}
            type={activity.type}
            level={activity.level}
            team_size={activity.team_size}
            date={activity.date}
            location={activity.location}
            reg_open={activity.reg_open}
            reg_close={activity.reg_close}
            contact_name={activity.contact_name}
            contact_phone={activity.contact_phone}
            contact_email={activity.contact_email}
            status={activity.status}
            description={activity.description}
          />
        ))
      ) : !user ? (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
  <div className="bg-purple-200 border border-purple-400 text-purple-900 px-6 py-4 rounded-lg shadow-md text-center">
    <span className="text-lg font-medium">
      Please login to see activities.
    </span>
  </div>
</div>


      ) : (
        <div className="alert alert-info text-center">
          <span>No Content.</span>
        </div>
      )}
    </div>
  );
};

export default Activities;