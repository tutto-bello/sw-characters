import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IPeople } from "../types";
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
    >
      <CardContent>
        <Box textAlign="center">
          <Box
            position="relative"
            width="150px"
            height="162px"
            marginX="auto"
            mb={1}
          >
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
          <Typography variant="body1" component="div">
            {name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
