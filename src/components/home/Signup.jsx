import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AuthImage } from "../../assets/images";
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
    first_name: "",
    last_name: "",
    dealership_name: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
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
    <Container
      maxWidth="xl"
      sx={
        {
          // py: "32px",
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
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
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            mx: "20px",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">Create an account</Typography>
          <Typography variant="body4">
            <b>Sign up and enjoy AED 1000 worth of credits on us! </b>
          </Typography>
          <InputField
            label="Username"
            name="username"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <InputField
            label="Email"
            name="email"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <InputField
            label="Phone"
            name="phone"
            formik={formik}
            margin="normal"
            fullWidth
          /> 
          <InputField
            label="First Name"
            name="first_name"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <InputField
            label="Last Name"
            name="last_name"
            formik={formik}
            margin="normal"
            fullWidth
          />
          <InputField
            label="Dealership Name"
            name="dealership_name"
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
            sx={{ width: "100%", height: "50px" }}
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
  );
}

export default Signup;
