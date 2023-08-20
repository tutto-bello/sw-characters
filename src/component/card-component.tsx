import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IPeople } from "../pages/api/types";
import Image from "next/image";

interface CardComponentProps {
  character: IPeople;
  index: number;
}

const CardComponent = (props: CardComponentProps) => {
  const { index } = props;
  const { name } = props.character;
  return (
    <Card
      sx={{
        width: "100%",
        margin: 2,
        "@media (min-width: 768px)": {
          width: "45%",
        },
        "@media (min-width: 1240px)": {
          width: "22.2%",
        },
      }}
    >
      <CardContent>
        <Box textAlign="center">
          <Box position="relative" width="200px" height="212px" marginX="auto">
            <Image
              src={
                index % 2 == 0
                  ? "/assets/mock-image.png"
                  : "/assets/mock-image-1.png"
              }
              fill
              alt={name}
              priority
              sizes="100%"
            />
          </Box>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
