import React from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const LoaderComponent = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {[1, 2, 3, 4].map((number) => (
        <Skeleton
          key={number}
          variant="rounded"
          sx={{
            width: "100%",
            height: "284px",
            margin: 2,
            "@media (min-width: 768px)": {
              width: "45%",
            },
            "@media (min-width: 1240px)": {
              width: "22.2%",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default LoaderComponent;
