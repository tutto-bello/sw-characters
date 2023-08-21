import React from "react";
import { AppBar, Container, Typography, useMediaQuery } from "@mui/material";

const HeaderComponent = () => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <AppBar>
      <Container sx={{ padding: 2 }}>
        <Typography
          variant={matches ? "h5" : "h6"}
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          Star Wars Characters Search
        </Typography>
      </Container>
    </AppBar>
  );
};

export default HeaderComponent;
