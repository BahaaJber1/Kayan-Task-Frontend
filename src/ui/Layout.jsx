import { BASE_URL } from "@app/config/settings.js";
import { setStartTheme } from "@app/store/slices/theme.slice.js";
import { clearUser, setUser } from "@store/slices/user.slice.js";
import { Outlet, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
        const result = await axios.get(`${BASE_URL}/authentication/verify`, {
          withCredentials: true,
        });
        dispatch(setUser(result.data.user));
        navigate({ to: "/dashboard" });
      } catch (error) {
        dispatch(clearUser());
        navigate({ to: "/" });
      }
    };

    verifyUser();

    const verifyUserIntervalId = setInterval(verifyUser, 12 * 60 * 60 * 1000);

    return () => clearInterval(verifyUserIntervalId);
  }, []);

  return (
    <>
      <Outlet />
      <Toaster
        gutter={-30}
        position="top-right"
        success={{
          duration: 5000,
        }}
        error={{
          duration: 5000,
        }}
      />
    </>
  );
};

export default Layout;
