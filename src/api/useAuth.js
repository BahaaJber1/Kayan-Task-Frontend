import axiosInstance from "@api/axiosInstance.js";
import { setUser } from "@app/store/slices/user.slice.js";
import { BASE_URL } from "@config/settings.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post(
        `${BASE_URL}/authentication/signin`,
        data,
      );
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}\n ${data.data.user.name}!`, {
        position: "top-center",
      });
      dispatch(setUser(data.data.user));
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(`${error.message} \n ${error.reason}`, {
        position: "top-center",
      });
    },
  });

  return { signin, isPending };
};

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post(
        `${BASE_URL}/authentication/signup`,
        data,
      );
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}\n ${data.data.user.name}!`, {
        position: "top-center",
      });
      dispatch(setUser(data.data.user));
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(`${error.message} \n ${error.reason}`, {
        position: "top-center",
      });
    },
  });

  return { signup, isPending };
};

export { useSignin, useSignup };

