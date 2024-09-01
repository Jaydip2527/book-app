import React, { useEffect, useState } from "react";
import HeaderComponent from "../Layout/header";
import { Box, Button, InputAdornment, TextField, Toolbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { confirmToast, toast } from "../../utils/constant";
import { deleteBook, getBooksData } from "../../redux/actions/bookActions";

export default function BookList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.items.items);
  
  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (booksData.length) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = booksData.filter((book) => 
        book.title.toLowerCase().includes(lowercasedQuery) ||
        book.authors.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, booksData]);

  const getBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      dispatch(getBooksData(token));
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteBook = async (row) => {
    try {
      const msg = await confirmToast("You won't be able to removed this!"); // msg
      if (msg) {
        dispatch(deleteBook(row._id));
      }
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Book Name',
      flex: 1,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      field: 'title',
      headerName: 'Book Title',
      flex: 2,
      minWidth: 200,
      maxWidth: 400,
    },
    {
      field: 'authors',
      headerName: 'Book Authors',
      flex: 2,
      minWidth: 200,
      maxWidth: 400,
    },
    {
      field: 'subtitle',
      headerName: 'Book Subtitle',
      flex: 1,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 2,
      minWidth: 200,
      maxWidth: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteBook(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <HeaderComponent />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search book..."
          value={searchQuery}
          sx={{ mb: 3 }}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
            sx={{ mb: 3 }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-book")}
          >
            Add
        </Button>
        <Box sx={{ height: "auto", width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row._id}
            disableColumnMenu
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Box>
    </>
  );
}
