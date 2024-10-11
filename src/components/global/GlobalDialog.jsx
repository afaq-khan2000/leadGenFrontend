import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const GlobalDialog = ({ open, onClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 600,
          padding: 5,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {title && (
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
        )}
        <Close sx={{ cursor: "pointer" }} onClick={onClose} />
      </Box>
      {children}
    </Dialog>
  );
};

export default GlobalDialog;
