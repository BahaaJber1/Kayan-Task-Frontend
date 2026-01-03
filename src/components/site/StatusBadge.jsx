import { cn } from "@lib/utils.js";
import { cloneElement } from "react";
import { BiAlarm, BiInfoCircle } from "react-icons/bi";
import { CgSandClock } from "react-icons/cg";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";

const statusConfig = {
  completed: { color: "#10b981", icon: <GrStatusGood /> },
  scheduled: { color: "#a855f7", icon: <CgSandClock /> },
  cancelled: { color: "#ef4444", icon: <MdCancel /> },
  pending: { color: "#f59e0b", icon: <BiInfoCircle /> },
  active: { color: "#3b82f6", icon: <BiAlarm /> },
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
