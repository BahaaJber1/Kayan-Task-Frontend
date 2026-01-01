import { setStartTheme } from "@app/store/slices/theme.slice.js";
import { clearUser, setUser } from "@store/slices/user.slice.js";
import { Outlet, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStartTheme());
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/v1/users/verify",
          { withCredentials: true },
        );
        dispatch(setUser(result.data.user));
        navigate({ to: "/dashboard" });
      } catch (error) {
        dispatch(clearUser());
        navigate({ to: "/" });
      }
    };

    verifyUser();

    const verifyUserIntervalId = setInterval(verifyUser, 12 * 60 * 60 * 1000); // every 12 hours

    return () => clearInterval(verifyUserIntervalId);
  }, []);

  return <Outlet />;
};

export default Layout;
