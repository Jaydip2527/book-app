import React, { useEffect, useState, useCallback } from "react";
import HeaderComponent from "../Layout/header";
import { Box, Button, InputAdornment, TextField, Toolbar, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { confirmToast, toast } from "../../utils/constant";
import { deleteBook, getBooksData } from "../../redux/actions/bookActions";

export default function BookList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pageSize, setPageSize] = useState(5); // Default to 5 rows per page
  const [loading, setLoading] = useState(false); // Add loading state
  const [page, setPage] = useState(0); // State to manage the current page
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.items.items);

  // Memoize getBooks function
  const getBooks = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const token = localStorage.getItem("token");
      await dispatch(getBooksData(token));
    } catch (error) {
      console.log("error ::", error);
      toast(error.message, "error");
    } finally {
      setLoading(false); // Set loading to false once data fetching is complete
    }
  }, [dispatch]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (booksData.length) {
      const lowercasedQuery = searchQuery.toLowerCase();
      // Filter and sort the books data
      const filtered = booksData
        .filter(
          (book) =>
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.authors.toLowerCase().includes(lowercasedQuery)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort in descending order by createdAt
      setFilteredData(filtered);
    }
  }, [searchQuery, booksData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteBook = async (row) => {
    try {
      const msg = await confirmToast("You won't be able to remove this!");
      if (msg) {
        await dispatch(deleteBook(row._id));
        getBooks(); // Reload data after deletion
        setPage(0); // Reset page to the first page
      }
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const columns = [
    {
      field: "isbn",
      headerName: "Isbn Number",
      flex: 1,
      minWidth: 150,
      maxWidth: "100vw",
    },
    {
      field: "title",
      headerName: "Book Title",
      flex: 1,
      minWidth: 200,
      maxWidth: "100vw",
    },
    {
      field: "authors",
      headerName: "Book Authors",
      flex: 1,
      minWidth: 200,
      maxWidth: "100vw",
    },
    {
      field: "subtitle",
      headerName: "Book Subtitle",
      flex: 1,
      minWidth: 150,
      maxWidth: "100vw",
    },
    {
      field: "description",
      headerName: "Book Description",
      flex: 1,
      minWidth: 150,
      maxWidth: "100vw",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      maxWidth: "100vw",
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
          Add Book
        </Button>
        <Box sx={{ height: "auto", width: "100%", overflowX: "auto" }}>
          {loading ? ( // Show loading indicator during data fetch or deletion
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 400 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredData}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              pageSizeOptions={[ 5, 10, 20, 100, { value: filteredData.length, label: "All" } ]} // Include 'All' option
              disableColumnMenu
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5, // Ensure 5 is set as the initial page size
                    page: page, // Use page state to control the current page
                  },
                },
              }}
              sx={{
                "& .MuiDataGrid-footerContainer": {
                  flexWrap: "wrap", // Allow wrapping of pagination controls
                },
                "& .css-16mfp94-MuiTablePagination-root .MuiTablePagination-selectLabel":
                  {
                    "@media (max-width:600px)": {
                      fontSize: "0.60rem", // Adjust font size for smaller screens
                    },
                    display: "block",
                  },
                "& .css-16mfp94-MuiTablePagination-root .MuiTablePagination-input":
                  {
                    display: "block",
                  },
                "& .MuiDataGrid-filler":
                  {
                    display: "none",
                  },
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
