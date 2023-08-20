import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const HeaderComponent = () => {
  return (
    <Toolbar sx={{ border: 1, borderColor: "white", margin: 2 }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ flex: 1 }}
      >
        Star Wars Characters Search
      </Typography>
    </Toolbar>
  );
};

export default HeaderComponent;
