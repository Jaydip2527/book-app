import React from "react";
import HeaderComponent from "../Layout/header";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Toolbar,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from "../../utils/constant";
import { useForm } from "react-hook-form";
import { BOOKLIST } from "../../routes";
import { addBook } from "../../redux/actions/bookActions";

export default function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(addBook(data, navigate));
      reset();
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    }
  };

  return (
    <>
      <HeaderComponent />
      <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Box
      sx={{
        minHeight: "80vh",
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
              <Box display="flex" justifyContent="center" mb={2}>
                Add Book Form
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Book Name"
                  {...register("name", {
                    required: "Book name is required.",
                  })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Book Title"
                  {...register("title", {
                    required: "Book Title is required.",
                  })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Book Author"
                  {...register("authors", {
                    required: "Book Author is required.",
                  })}
                  error={Boolean(errors.authors)}
                  helperText={errors.authors?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Book Subtitle"
                  {...register("subtitle", {
                    required: "Book Subtitle is required.",
                  })}
                  error={Boolean(errors.subtitle)}
                  helperText={errors.subtitle?.message}
                />
                <Box display="flex" justifyContent="end" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Book
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ ml: 1 }}
                    onClick={() => navigate(BOOKLIST)}
                  >
                    Back
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
        </Box>
      </Box>
    </>
  );
}
