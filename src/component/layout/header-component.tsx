import React from "react";
import { AppBar, Container, Typography } from "@mui/material";

const HeaderComponent = () => {
  return (
    <AppBar>
      <Container sx={{ padding: 2 }}>
        <Typography
          component="h2"
          variant="h5"
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
