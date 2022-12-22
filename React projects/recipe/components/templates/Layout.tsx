import React, { ReactElement } from "react";
import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";
import { Container } from "@mantine/core";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export default function Layout(props: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      <Container size="xl" pt="xl">
        {props.children}
      </Container>
      <Footer />
    </React.Fragment>
  );
}
