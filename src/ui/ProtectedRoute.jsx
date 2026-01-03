import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user.role) {
      navigate({ to: "/" });
    }
  }, [user.role]);

  return <>{children}</>;
};

export default ProtectedRoute;
