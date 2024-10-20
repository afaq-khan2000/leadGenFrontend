import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AuthImage, BGSignup } from "../../assets/images";
import InputField from "../global/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../axios";

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    dealership_name: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    dealership_name: Yup.string().required("Dealership name is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      let res = await AuthAPI.register(values);
      setIsLoading(false);
      console.log(res);
      if (res.status === 200) {
        navigate("/login");
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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BGSignup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          filter: "brightness(0.5)",
        }}
      />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              height: "max-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
              p: { xs: "20px", md: "40px" },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "20px",
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h4">Create an account</Typography>
            <Typography variant="body4">
              <b>Sign up and enjoy AED 1000 worth of credits on us! </b>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Username"
                  name="username"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Email"
                  name="email"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Phone"
                  name="phone"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="First Name"
                  name="first_name"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Last Name"
                  name="last_name"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Dealership Name"
                  name="dealership_name"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  formik={formik}
                  margin="normal"
                  fullWidth
                />
              </Grid>
            </Grid>
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
              <Typography variant="body2">
                By signing up, you agree to our{" "}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                >
                  Terms
                </Typography>{" "}
                and{" "}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                >
                  Privacy Policy
                </Typography>
              </Typography>
              <Typography variant="body2" sx={{ mt: "10px" }}>
                Already have an account?{" "}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
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
                "Sign Up"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
