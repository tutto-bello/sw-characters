import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export const FooterComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        color: "yellow",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} position="relative">
            <Image
              src="/assets/sw-logo.png"
              alt="Star Wars Logo"
              width={100}
              height={50}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="yellow" variant="subtitle1">
              {`${new Date().getFullYear()} | tuttobello™`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterComponent;
