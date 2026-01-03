import axiosInstance from "@api/axiosInstance.js";
import queryClient from "@api/queryClient.js";
import { BASE_URL } from "@config/settings.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetVisits = () => {
  const {
    isLoading,
    data: visits,
    error,
  } = useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      const result = await axiosInstance.get(`${BASE_URL}/visits`);
      return result.data.visits;
    },
  });
  return { isLoading, visits, error };
};

const useBookVisit = () => {
  const { mutate: bookVisit, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post(`${BASE_URL}/visits/book`, data);
    },
    onSuccess: async (data) => {
      toast.success(`${data.data.message}`);
      await queryClient.invalidateQueries(["visits"]);
    },
    onError: (error) => {
      toast.error(`${error.message} \n ${error.reason}`);
    },
  });
  return { bookVisit, isPending };
};

const useCompleteVisit = () => {
  const { mutate: completeVisit, isPending } = useMutation({
    mutationFn: async ({ visitId, treatments, medicalNotes, amount }) => {
      return await axiosInstance.post(`${BASE_URL}/visits/complete`, {
        visitId,
        treatments,
        medicalNotes,
        amount,
      });
    },
    onSuccess: async (data) => {
      toast.success(`${data.data.message}`);
      await queryClient.invalidateQueries(["visits"]);
    },
    onError: (error) => {
      toast.error(`${error.message} \n ${error.reason}`);
    },
  });
  return { completeVisit, isPending };
};

const useAcceptVisit = () => {
  const { mutate: acceptVisit, isPending } = useMutation({
    mutationFn: async ({ visitId }) => {
      return await axiosInstance.post(`${BASE_URL}/visits/accept`, { visitId });
    },
    onSuccess: async (data) => {
      toast.success(`${data.data.message}`);
      await queryClient.invalidateQueries(["visits"]);
    },
    onError: (error) => {
      toast.error(`${error.message} \n ${error.reason}`);
    },
  });
  return { acceptVisit, isPending };
};

export { useGetVisits, useBookVisit, useCompleteVisit, useAcceptVisit };
