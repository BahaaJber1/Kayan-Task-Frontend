import { BiAlarm, BiCheckCircle, BiInfoCircle } from "react-icons/bi";
import { PiStackFill } from "react-icons/pi";

const cardData = [
  {
    id: 1,
    title: "Total Visits",
    icon: PiStackFill,
    iconColor: "#2b7fff",
    calculate: (visits) => visits?.length || 0,
  },
  {
    id: 2,
    title: "Active",
    icon: BiAlarm,
    iconColor: "#ff6900",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "active").length || 0,
  },
  {
    id: 3,
    title: "Pending",
    icon: BiInfoCircle,
    iconColor: "#ffcc00",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "pending").length || 0,
  },
  {
    id: 4,
    title: "Completed",
    icon: BiCheckCircle,
    iconColor: "#10b981",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "completed").length || 0,
  },
];

export { cardData };
