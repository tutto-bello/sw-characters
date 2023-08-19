import React from "react";
import HeaderComponent from "./header-component";
import FooterComponent from "./footer-component";
import { Container } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Container sx={{ maxWidth: "1440px" }}>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </Container>
  );
};

export default LayoutComponent;
