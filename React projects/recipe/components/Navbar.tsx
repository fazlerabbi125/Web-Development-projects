import { useState } from "react";
import CustomNavLink from "./CustomNavLink";
import Image from "next/image";
import {
  Navbar as BSNavbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <BSNavbar className="custom-navbar" expand="sm">
      <NavbarBrand>
        <Image alt="logo" src="/images/cutlery.svg" width={40} height={40} />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem className="ml-4">
            <CustomNavLink href="/">Home</CustomNavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </BSNavbar>
  );
}
