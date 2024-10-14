import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AuthImage, BGImage } from "../../assets/images";
import InputField from "../global/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../axios";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      let res = await AuthAPI.login(values);
      setIsLoading(false);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        // py: "32px",
        // backgroundImage: `url(${BGImage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BGImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          filter: "brightness(0.5)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* <Box
          sx={{
            width: "50%",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="img"
            src={AuthImage}
            alt="Signup"
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box> */}
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            height: "max-content",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
            // mx: "20px",
            p: { xs: "20px", md: "40px" },
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">Login to your account</Typography>
          <Typography variant="body2">
            Get access to your Leads Dashboard
          </Typography>
          <InputField
            label="Email"
            name="email"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "20px",
            }}
          >
            <Typography variant="body2" sx={{ mt: "10px" }}>
              Don't have an account?{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Signup
              </Typography>
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", height: "50px", mt: "20px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
