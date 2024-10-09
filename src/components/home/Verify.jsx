import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../axios";

function Verify() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const verification_code = new URLSearchParams(window.location.search).get("verification_code");
  console.log(verification_code);

  useEffect(() => {
    AuthAPI.verifyEmail({ verification_code })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [verification_code]);

  return (
    <Container maxWidth="xl" sx={{}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">Verifying...</Typography>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">Email verified successfully!</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Verify;
