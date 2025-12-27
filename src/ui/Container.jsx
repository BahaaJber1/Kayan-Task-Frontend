import { cn } from "@lib/utils.js";
import { motion as m } from "motion/react";

const Container = ({ children, className, ...props }) => {
  return (
    <m.div className={cn("flex flex-col gap-5", className)} {...props}>
      {children}
    </m.div>
  );
};

export default Container;
