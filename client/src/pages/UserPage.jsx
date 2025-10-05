import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

const UserPage = ({ children }) => {
    const { user } = useAuthContext();

    
    if (!user) {
        return <Navigate to="/signin" replace />;
    }


    return children;
};

export default UserPage;
