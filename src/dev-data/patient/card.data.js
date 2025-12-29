import { Stethoscope } from "lucide-react";
import { BsCalendar2 } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";

const cardData = [
  {
    id: 1,
    title: "Total Visits",
    icon: BsCalendar2,
    iconColor: "#00c951",
    number: "1",
  },
  {
    id: 2,
    title: "Upcoming",
    icon: CiClock2,
    iconColor: "#ff6900",
    number: "1",
  },
  {
    id: 3,
    title: "Completed",
    icon: Stethoscope,
    iconColor: "#2b7fff",
    number: "1",
  },
];

export { cardData };
