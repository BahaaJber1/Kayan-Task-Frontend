import { cn } from "@lib/utils.js";
import { cloneElement } from "react";
import { CgSandClock } from "react-icons/cg";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";

const statusConfig = {
  Completed: { color: "#10b981", icon: <GrStatusGood /> },
  Scheduled: { color: "#a855f7", icon: <CgSandClock /> },
  Cancelled: { color: "#ef4444", icon: <MdCancel /> },
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
