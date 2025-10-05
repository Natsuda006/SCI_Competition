import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import TokenService from "../services/token.service";

const AdminPage = ({ children }) => {
    const { user } = useAuthContext();
    
    // Also check token service directly for debugging
    const storedUser = TokenService.getUser();
    console.log("AdminPage - TokenService stored user:", storedUser);

    // Debugging logs to see what's happening
    console.log("AdminPage - Current user from context:", user);

    if (!user) {
        console.log("AdminPage - No user found, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    // Check user type - might be in user.user.type or user.type depending on how data is stored
    const userType = user.user ? user.user.type : user.type;
    console.log("AdminPage - User type:", userType);

    if (userType !== "admin") {
        console.log("AdminPage - User is not admin, redirecting to not allowed");
        return <Navigate to="/notallowed" replace />;
    }

    return children;
};

export default AdminPage;