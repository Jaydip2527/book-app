import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP } from "../../routes";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { noSpeacialCharRegx, passwordRegx, toast } from "../../utils/constant";
import img from "../../assets/logo1.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/bookActions";

const Login = () => {
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
      dispatch(loginUser(data, navigate));
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
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={3}>
                <img src={img} alt="Logo" width={180} />
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="User Name"
                  variant="outlined"
                  margin="normal"
                  {...register("username", {
                    required: "User name is required.",
                    pattern: {
                      value: noSpeacialCharRegx,
                      message: "Please enter a valid User Name.",
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
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2, py: 2 }}
                >
                  Sign In
                </Button>
              </form>
              <Typography align="center" variant="body2" gutterBottom>
                OR
              </Typography>
              <Grid container justifyContent="center">
                <Typography variant="body2" gutterBottom>
                  Don’t have an account?
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Link to={SIGNUP} style={{ marginLeft: 5, textDecoration: "none" }}>
                    Create an account
                  </Link>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
