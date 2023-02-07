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
  const toggleNavMenu = () => setIsOpen(!isOpen);
  return (
    <nav className={styles.navbar}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <Image alt="logo" src="/images/cutlery.svg" width={40} height={40} />
        </div>
        <Burger opened={isOpen} onClick={toggleNavMenu} className="navbar-toggler sm:block md:hidden" />
        <div className={`custom-collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            {routes.map((route) => (
              <li className="nav-item sm:ml-4" key={route.link}>
                <CustomNavLink href={route.link}>{route.text}</CustomNavLink>
              </li>
            ))}
          </ul>
          <div className={[].join(" ")}>
            <RecipeAutoComplete />
          </div>
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