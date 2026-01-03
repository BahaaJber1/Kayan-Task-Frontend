import { BiCheckCircle, BiDollar, BiTrendingUp } from "react-icons/bi";

const cardData = [
  {
    id: 1,
    title: "Total Revenue",
    icon: BiDollar,
    iconColor: "#00c951",
    calculate: (data) => {
      return data?.reduce((total, visit) => total + Number(visit.amount), 0);
    },
  },
  {
    id: 2,
    title: "Completed Visits",
    icon: BiCheckCircle,
    iconColor: "#2b7fff",
    calculate: (data) => {
      return data?.filter((visit) => visit.status === "completed")?.length;
    },
  },
  {
    id: 3,
    title: "Average Visit Value",
    icon: BiTrendingUp,
    iconColor: "#8e44ad",
    calculate: (data) => {
      const completedVisits = data?.filter(
        (visit) => visit.status === "completed",
      );
      if (completedVisits?.length === 0) return 0;
      const totalRevenue = completedVisits?.reduce(
        (total, visit) => total + Number(visit.amount),
        0,
      );
      return (totalRevenue / completedVisits?.length).toFixed(2);
    },
  },
];

export { cardData };
