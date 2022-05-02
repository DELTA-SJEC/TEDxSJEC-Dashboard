/* eslint-disable */
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";

//axios
import axios from "axios";
import DashboardApp from "src/pages/DashboardApp";
const FormData = require("form-data");

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      //localStorage.setItem("email",values.email);
      //localStorage.setItem("password", values.password);

      axios
        .post("https://ted.vigneshcodes.in/api/login", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then(
          (response) => {
            //console.log(response.data['token']);
            localStorage.setItem("token", response.data["token"]);
            navigate("/dashboard/app", { replace: true });
          },
          (error) => {
            setSubmitting(false);
            alert("Wrong Email or Password!");
          }
        );
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
