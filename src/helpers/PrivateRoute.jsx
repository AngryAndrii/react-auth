import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box sx={{ color: "white" }}>Звантаження....</Box>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
