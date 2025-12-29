import { Button } from "@components/ui/button.jsx";
import { motion as m } from "motion/react";

const AnimatedButton = m.create(Button);

const buttonVariant = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const MotionButton = ({ children, whileHover, ...props }) => {
  return (
    <AnimatedButton
      variants={buttonVariant}
      whileHover={whileHover || "hover"}
      whileTap="tap"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </AnimatedButton>
  );
};

export default MotionButton;
