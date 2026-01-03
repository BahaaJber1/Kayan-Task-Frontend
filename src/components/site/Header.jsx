import Logo from "@components/application/Logo.jsx";
import MotionButton from "@components/application/MotionButton.jsx";
import ToggleTheme from "@components/application/ToggleTheme.jsx";
import { cn } from "@lib/utils.js";
import { setUser } from "@store/slices/user.slice.js";
import { useNavigate } from "@tanstack/react-router";
import Container from "@ui/Container.jsx";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/v1/authentication/signout",
      {},
      { withCredentials: true },
    );

    if (result.status !== 200) {
      return;
    }
    dispatch(setUser({}));
    navigate({ to: "/" });
  };

  return (
    <header
      className={cn(
        "bg-background/5 sticky top-0 z-50 flex w-full items-center justify-between rounded-lg px-5 py-4 backdrop-blur-lg",
      )}
    >
      <Logo className={cn("flex-row")} size={30} showRoleText={true} />
      <Container className={cn("flex-row")}>
        <MotionButton variant="outline" onClick={logout}>
          <BiExit /> Logout
        </MotionButton>
        <ToggleTheme />
      </Container>
    </header>
  );
};

export default Navbar;
