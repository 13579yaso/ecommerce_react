import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      emailOrPhone: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrPhone: Yup.string()
        .required("Email or phone number is required")
        .min(5, "Too short!"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      // 🔹 قراءة بيانات المستخدم المسجلة مسبقًا من localStorage
      const savedUser = JSON.parse(localStorage.getItem("userData"));

      if (!savedUser) {
        alert("No registered account found. Please register first.");
        navigate("/register");
        return;
      }

      // 🔹 التحقق من صحة البيانات
      if (
        savedUser.email === values.emailOrPhone &&
        savedUser.password === values.password
      ) {
        alert("✅ Login successful!");
        navigate("/"); // رجوع للهوم بعد تسجيل الدخول
      } else {
        alert("❌ Invalid email or password!");
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          p: 5,
          borderRadius: 3,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          bgcolor: "white",
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2 }}>
          <img
            src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
            alt="bazaar logo"
            width="100"
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 3 }}>
          Welcome To Bazaar
        </Typography>

        {/* Login form */}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email or Phone Number"
            name="emailOrPhone"
            value={formik.values.emailOrPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailOrPhone &&
              Boolean(formik.errors.emailOrPhone)
            }
            helperText={
              formik.touched.emailOrPhone && formik.errors.emailOrPhone
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "black",
              "&:hover": { bgcolor: "grey.800" },
              textTransform: "capitalize",
            }}
          >
            Login
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Stack spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "capitalize" }}
          >
            Continue With Facebook
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "capitalize" }}
          >
            Continue With Google
          </Button>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
