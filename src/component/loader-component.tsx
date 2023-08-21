import React from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const LoaderComponent = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {[1, 2, 3, 4, 5].map((number) => (
        <Skeleton
          key={number}
          variant="rounded"
          sx={{
            height: "234px",
            width: "80%",
            margin: 1,
            "@media (min-width: 425px)": {
              width: "45%",
            },
            "@media (min-width: 768px)": {
              width: "25%",
            },
            "@media (min-width: 1240px)": {
              width: "18%",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default LoaderComponent;
