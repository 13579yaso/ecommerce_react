import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email or phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Retype Password is required"),
    terms: Yup.boolean().oneOf([true], "You must agree to Terms & Condition"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // 1️⃣ خزن المستخدم في localStorage
      localStorage.setItem("userData", JSON.stringify(values));

      // 2️⃣ أظهر رسالة نجاح
      alert("Account created successfully 🎉");

      // 3️⃣ روح لصفحة login
      navigate("/login");
    },
  });

  return (
    <Box
      sx={{
        width: 400,
        mx: "auto",
        my: 5,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Welcome To Bazaar
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email or Phone Number"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              By signing up, you agree to{" "}
              <Typography
                component="span"
                color="primary"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Terms & Condition
              </Typography>
            </Typography>
          }
        />
        {formik.touched.terms && formik.errors.terms && (
          <Typography color="error" fontSize={13} ml={1.5}>
            {formik.errors.terms}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "black",
            "&:hover": { bgcolor: "#333" },
            textTransform: "capitalize",
          }}
        >
          Create An Account
        </Button>
      </form>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Stack spacing={1}>
        <Button
          variant="outlined"
          startIcon={<Facebook />}
          fullWidth
          sx={{ textTransform: "capitalize" }}
        >
          Continue With Facebook
        </Button>
        <Button
          variant="outlined"
          startIcon={<Google />}
          fullWidth
          sx={{ textTransform: "capitalize" }}
        >
          Continue With Google
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
