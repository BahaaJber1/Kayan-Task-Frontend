import { cn } from "@lib/utils.js";
import { cloneElement } from "react";
import { BiAlarm, BiCheckCircle, BiInfoCircle } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const statusConfig = {
  completed: { color: "#10b981", icon: <BiCheckCircle /> },
  cancelled: { color: "#ef4444", icon: <MdCancel /> },
  pending: { color: "#ffcc00", icon: <BiInfoCircle /> },
  active: { color: "#ff6900", icon: <BiAlarm /> },
};

const StatusBadge = ({ status, showText = true }) => {
  const { color, icon } = statusConfig[status];

  if (!showText) {
    return cloneElement(icon, { color, size: 20 });
  }

  return (
    <span
      className={cn(
        "text-background flex items-center gap-2 rounded-full px-2 py-1 text-sm",
      )}
      style={{ backgroundColor: color }}
    >
      {icon} {status}
    </span>
  );
};

export default StatusBadge;
