import { cn } from "@app/lib/utils.js";
import Logo from "@components/application/Logo.jsx";
import { Button } from "@components/ui/button.jsx";
import { BiExit } from "react-icons/bi";

const Navbar = () => {
  return (
    <header className={cn("flex items-center justify-between")}>
      <Logo className={cn("flex-row")} size={30} role="patient" />
      <Button variant="outline" onClick={() => alert("logout")}>
        <BiExit /> Logout
      </Button>
    </header>
  );
};

export default Navbar;
