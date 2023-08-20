import React from "react";
import HeaderComponent from "./header-component";
import FooterComponent from "./footer-component";
import { Container, Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Container sx={{ maxWidth: "1440px" }}>
      <HeaderComponent />
      <Box mt={10}>{children}</Box>
      <FooterComponent />
    </Container>
  );
};

export default LayoutComponent;
