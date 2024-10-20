import React from "react";
import { Fab } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";

function FabIcon() {
  return (
    <Fab
      color="#25d366"
      aria-label="add"
      sx={{ position: "fixed", bottom: 20, right: 20, width: 70, height: 70 }}

    >
      <WhatsApp
        sx={{ color: "#25d366", width: 50, height: 50 }}
        onClick={() => {
          window.open("https://wa.me/+971505426061", "_blank");
        }}
      />
    </Fab>
  );
}

export default FabIcon;
