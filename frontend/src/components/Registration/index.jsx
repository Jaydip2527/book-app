import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SIGNIN } from "../../routes";
import {
  emailRegx,
  noSpeacialCharRegx,
  passwordRegx,
  toast,
} from "../../utils/constant";
import img from "../../assets/logo1.png";

import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/bookActions";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      dispatch(registerUser(data, navigate));
      reset();
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={3}>
                <img src={img} width={180} alt="Not Found" />
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="User Name"
                  {...register("username", {
                    required: "User name is required.",
                    pattern: {
                      value: noSpeacialCharRegx,
                      message: "Please enter a valid user name.",
                    },
                    maxLength: {
                      value: 20,
                      message: "User name should be at most 20 characters.",
                    },
                    minLength: {
                      value: 2,
                      message: "User name should be at least 2 characters.",
                    },
                  })}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: emailRegx,
                      message: "Please enter a valid email.",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: passwordRegx,
                      message:
                        "Password must have one letter, one number, and one special character.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password should be at most 12 characters.",
                    },
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters.",
                    },
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography variant="body1">
                    Already have an account?
                  </Typography>
                  <Link to={SIGNIN} style={{ marginLeft: 5, textDecoration: "none" }}>
                    <Typography variant="body1" color="primary">
                      Sign In
                    </Typography>
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Registration;
