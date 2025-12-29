import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";

const cardVariants = {
  initial: {},
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 500,
      damping: 10,
    },
  },
};

const backgroundVariants = {
  initial: {
    scale: 1,
    opacity: 0.6,
  },
  hover: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 0.3,
      type: "spring",
    },
  },
};

const Card = ({ card, ...props }) => {
  const { title: text, icon: Icon, number, iconColor } = card;
  return (
    <Container
      className={cn("relative w-full rounded-lg")}
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      {...props}
    >
      <Container className={cn("bg-background relative z-10 rounded-lg p-4")}>
        <Container className={cn("flex-row justify-between")}>
          {text}
          <Icon size={24} style={{ color: iconColor }} />
        </Container>
        <Container className={cn("text-2xl font-semibold")}>{number}</Container>
      </Container>

      <Container
        className={cn("absolute -inset-1")}
        style={{ backgroundColor: `${iconColor}70`, filter: "blur(10px)" }}
        variants={backgroundVariants}
      />
    </Container>
  );
};

export default Card;
