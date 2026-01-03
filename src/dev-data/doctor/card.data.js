import { BiUser } from "react-icons/bi";
import { BsCalendar2 } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { GrDocument } from "react-icons/gr";

const cardData = [
  {
    id: 1,
    title: "Total Visits",
    icon: BsCalendar2,
    iconColor: "#00c951",
    number: "2",
    calculate: (visits) => visits?.length || 0,
  },
  {
    id: 2,
    title: "Scheduled",
    icon: CiClock2,
    iconColor: "#ff6900",
    number: "1",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "scheduled").length || 0,
  },
  {
    id: 3,
    title: "Active",
    icon: BiUser,
    iconColor: "#ffcc00",
    number: "0",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "active").length || 0,
  },
  {
    id: 4,
    title: "Completed",
    icon: GrDocument,
    iconColor: "#2b7fff",
    number: "1",
    calculate: (visits) =>
      visits?.filter((v) => v.status === "completed").length || 0,
  },
];

export { cardData };
