import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

function Cards({
  data = [
    {
      title: "My Credits",
      value: 1000,
    },
    {
      title: "Total Leads",
      value: 100,
    },
    {
      title: "Unlocked Leads",
      value: 50,
    },
  ],
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", my: 5 }}>
      {data.map((card, index) => (
        <Card
          key={index}
          sx={{
            height: 150,
            width: "30%",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="h4" color="text.primary">
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Cards;
