import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { motion as m } from "motion/react";
import { GiHealthPotion } from "react-icons/gi";
import { useSelector } from "react-redux";

const AnimatedSVG = m.create(GiHealthPotion);
const animatedSVGVariant = {
  animate: {
    rotate: [20, -20],
    transition: { repeat: Infinity, duration: 1, repeatType: "mirror" },
  },
};

const Logo = ({ className, size = 50, showRoleText = false }) => {
  const { role } = useSelector((state) => state.user.user);

  return (
    <Container className={cn("flex-row items-center")}>
      <span className={cn("bg-kayan-accent rounded-full p-3")}>
        <AnimatedSVG
          size={size}
          className={cn("text-white")}
          variants={animatedSVGVariant}
          animate="animate"
        />
      </span>
      {!showRoleText && (
        <h2 className={cn("text-2xl font-semibold")}>Healthcare Portal</h2>
      )}
      {showRoleText && (
        <Container className={cn("gap-1")}>
          <h2 className={cn("text-2xl font-semibold")}>Healthcare Portal</h2>
          <span className={cn("text-foreground/75 capitalize")}>
            {role} account
          </span>
        </Container>
      )}
    </Container>
  );
};

export default Logo;
