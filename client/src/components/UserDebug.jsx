import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import TokenService from "../services/token.service";

const UserDebug = () => {
    const { user } = useAuthContext();
    const storedUser = TokenService.getUser();
    
    return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">User Debug Info</h3>
            <p><strong>Context User:</strong> {JSON.stringify(user, null, 2)}</p>
            <p><strong>Stored User:</strong> {JSON.stringify(storedUser, null, 2)}</p>
            <button 
                onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                }}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
                Clear User Data
            </button>
        </div>
    );
};

export default UserDebug;