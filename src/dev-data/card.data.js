import { Stethoscope } from "lucide-react";
import { BsCalendar2, BsWatch } from "react-icons/bs";

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
    icon: BsWatch,
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
