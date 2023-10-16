import { ReactNode } from "react";
import { Logo } from "components";

type NavbarProps = {
  children: ReactNode;
};

export const Navbar = ({ children }: NavbarProps) => (
  <nav className="nav-bar">
    <Logo />
    {children}
  </nav>
);
