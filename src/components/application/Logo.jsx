import { cn } from "@lib/utils.js";
import { GiHealthPotion } from "react-icons/gi";
import { motion as m } from "motion/react";
import Container from "@app/ui/Container.jsx";

const AnimatedSVG = m.create(GiHealthPotion);
const animatedSVGVariant = {
  animate: {
    rotate: [20, -20],
    transition: { repeat: Infinity, duration: 1, repeatType: "mirror" },
  },
};

const Logo = ({ className, size = 50 }) => {
  const role = "doctor"; // placeholder for now
  return (
    <Container className={cn("items-center gap-0 px-3")}>
      <Container className={cn("items-center", className)}>
        <span className={cn("bg-kayan-accent rounded-full p-3")}>
          <AnimatedSVG
            size={size}
            className={cn("text-white")}
            variants={animatedSVGVariant}
            animate="animate"
          />
        </span>
        <h2 className={cn("text-2xl font-semibold")}>Healthcare Portal</h2>
      </Container>
      {role && <Container>{role} account</Container>}
    </Container>
  );
};

export default Logo;
