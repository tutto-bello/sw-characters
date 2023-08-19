import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const HeaderComponent = () => {
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
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
