import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  if (!user.role) navigate({ to: "/" });
  return <>{children}</>;
};

export default ProtectedRoute;
