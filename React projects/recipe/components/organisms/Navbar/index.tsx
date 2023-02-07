//https://tailwindui.com/components/application-ui/navigation/navbars
import { useState } from "react";
import CustomNavLink from "../../atoms/CustomNavLink";
import Image from "next/image";
import { Burger } from "@mantine/core";
import RecipeAutoComplete from "../../molecules/RecipeAutoComplete";
import styles from "./Navbar.module.scss";

const routes = [
  { link: "/", text: "Home" },
  { link: "/tags", text: "Tags" },
  { link: "/about", text: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <nav className={styles.navbar}>
      <div>
        <Image alt="logo" src="/images/cutlery.svg" width={40} height={40} />
      </div>
      <Burger opened={isOpen} onClick={toggle} className="sm:block md:hidden" />
      <div className={styles.navbar__collapse}>
        <div className={[styles.navbar__nav, "mr-auto"].join(" ")}>
          {routes.map((route) => (
            <div className="sm:ml-4" key={route.link}>
              <CustomNavLink href={route.link}>{route.text}</CustomNavLink>
            </div>
          ))}
        </div>
        <div className={[styles.navbar__nav, "ml-auto"].join(" ")}>
            <RecipeAutoComplete />
        </div>
      </div>
    </nav>
  );
}
{/* 
import {
  Navbar as BSNavbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
<BSNavbar className="custom-navbar" expand="sm">
      <NavbarBrand>
        <Image alt="logo" src="/images/cutlery.svg" width={40} height={40} />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} style={{ border: "none" }} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {routes.map((route) => (
            <NavItem className="sm:ml-4" key={route.link}>
              <CustomNavLink href={route.link}>{route.text}</CustomNavLink>
            </NavItem>
          ))}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <RecipeAutoComplete />
          </NavItem>
        </Nav>
      </Collapse>
    </BSNavbar> */}