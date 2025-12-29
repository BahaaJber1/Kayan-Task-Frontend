import { cn } from "@app/lib/utils.js";
import Container from "@ui/Container.jsx";
import Logo from "@components/application/Logo.jsx";
import MotionButton from "@components/application/MotionButton.jsx";
import ToggleTheme from "@components/application/ToggleTheme.jsx";
import { BiExit } from "react-icons/bi";

const Navbar = () => {
  return (
    <header
      className={cn(
        "bg-background/5 sticky top-0 z-50 flex w-full items-center justify-between rounded-lg px-5 py-4 backdrop-blur-lg",
      )}
    >
      <Logo className={cn("flex-row")} size={30} />
      <Container className={cn("flex-row")}>
        <MotionButton variant="outline" onClick={() => alert("logout")}>
          <BiExit /> Logout
        </MotionButton>
        <ToggleTheme />
      </Container>
    </header>
  );
};

export default Navbar;
