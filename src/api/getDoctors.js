import axiosInstance from "@api/axiosInstance.js";
import { BASE_URL } from "@config/settings.js";
import { setDoctor } from "@store/slices/user.slice.js";
import { store } from "@store/store.js";
import { queryOptions } from "@tanstack/react-query";

const getDoctors = queryOptions({
  queryKey: ["doctors"],
  queryFn: async () => {
    const result = await axiosInstance.get(`${BASE_URL}/users`);
    store.dispatch(setDoctor(result.data.doctors));
    return result.data.doctors;
  },
});

export { getDoctors };
