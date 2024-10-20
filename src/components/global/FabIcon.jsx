import React from "react";
import { Fab } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";

function FabIcon() {
  return (
    <Fab
      color="#25d366"
      aria-label="add"
//       sx={{ position: "fixed", bottom: 20, right: 20, width: 100, height: 70 }}
      sx={{position: "fixed",
                   bottom: 20,
                   left: 20, // Changed from right to left as per previous request
                   width: 70,
                   height: 70,
                   backgroundColor: "#25d366",
                   borderRadius: "50%",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   cursor: "pointer",
                   boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"}}
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
