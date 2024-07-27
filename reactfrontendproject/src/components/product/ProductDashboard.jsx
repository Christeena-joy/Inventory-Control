import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, MenuItem, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import MiniDrawer from "../admin/MiniDrawer";
import UserMiniDrawer from "../authuser/UserMiniDrawer";
import { useAuth } from "../auth/AuthProvider";


export default function ProductDashboard() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [newRecordData, setNewRecordData] = useState({});
  const [isAddForm, setIsAddForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const columns = [
    { field: 'pname', headerName: 'Product', width: 180 },
    { field: 'categoryName', headerName: 'Category', width: 180 },
    { field: 'purchasePrice', headerName: 'Purchase Price', width: 170, editable: true },
    { field: 'salePrice', headerName: 'Sale Price', width: 170, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 180, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleUpdate(params.row)}
          >
            Update
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button> */}
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);



  const fetchCategories = async () => {
    try {
      const headers = getHeader();
      const response = await axios.get('http://localhost:8080/admin/categories', { headers });
      console.log("Categories data from fetchCategories method: ")
      console.table(response.data)
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = async () => {
    try {
      const headers = getHeader();
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:8080/admin/products', { headers }),
        axios.get('http://localhost:8080/admin/categories', { headers }),
      ]);

      console.table(productsResponse.data)
      const products = productsResponse.data;
      const categoriesMap = {}; // Map category IDs to their names

      // Create a map of category IDs to their names
      categoriesResponse.data.forEach(category => {
        categoriesMap[category.categoryId] = category.cname;
      });
      console.log("Categories Mapping: ", categoriesMap)

      // Map products data
      const mappedRows = products.map(product => ({
        ...product,
        id: product.pid,
        categoryName: categoriesMap[product.categoryId], // Map category ID to category name
      }));

      setRows(mappedRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddRecord = () => {
    setSelectedRow(null);
    setIsAddForm(true);
    setOpen(true);
  };

  const handleAddRecordSubmit = async () => {
    if (validateForm(newRecordData)) {
      try {
        const headers = getHeader();
        console.log("Data being sent in the POST request:", newRecordData);
        await axios.post('http://localhost:8080/admin/products', newRecordData, { headers });
        setOpen(false);
        setNewRecordData({});
        fetchData();
        setSnackbarSeverity("success");
        setSnackbarMessage("Product added successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error adding new record:', error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error adding product!");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all fields!");
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = (row) => {
    setSelectedRow(row);
    setIsAddForm(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      const headers = getHeader();
      await axios.delete(`http://localhost:8080/admin/products/${row.pid}`, { headers });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddForm) {
      setNewRecordData({ ...newRecordData, [name]: value });
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    const updatedFields = { ...selectedRow, ...updatedData };
    if (validateForm(updatedFields)) {
      try {
        const headers = getHeader();
        const updatedRow = { ...selectedRow, ...updatedData };
        console.log("Update data to be sent: ", updatedRow)
        await axios.put(`http://localhost:8080/admin/products/${selectedRow.pid}`, updatedRow, { headers });
        setOpen(false);
        fetchData();
        setSnackbarSeverity("success");
        setSnackbarMessage("Product updated successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error updating data:', error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error updating product!");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all fields!");
      setSnackbarOpen(true);
    }
  };

  const validateForm = (data) => {
    return data.pname && data.categoryId && data.purchasePrice && data.salePrice && data.quantity;
  };

  const storedUserRole = localStorage.getItem("userId");

  return (
    <Box m={2} sx={{
      height: 500,
      width: '80%',
      marginTop: '100px',
      marginLeft: '100px',
    }}>
      {storedUserRole && storedUserRole === 'admin' ? <MiniDrawer /> : <UserMiniDrawer />}
      <Button variant="contained" color="primary" onClick={handleAddRecord} sx={{marginBottom:"10px"}}>Add Product</Button>
      <DataGrid rows={rows} columns={columns} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddForm ? 'Add Product' : 'Update Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pname"
            name="pname"
            label="Product Name"
            type="text"
            fullWidth
            defaultValue={isAddForm ? newRecordData.pname : selectedRow?.pname}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            id="categoryId"
            name="categoryId"
            label="Category"
            fullWidth
            defaultValue={isAddForm ? newRecordData.categoryId || '' : selectedRow?.categoryId}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.cname}
              </MenuItem>
            ))}
          </TextField>
          {/* <CommonDropdown
            apiUrl="http://localhost:8080/admin/categories"
            id="categoryId"
            label="Category"
            name="categoryId"
            backendkey="category_id"
            backendvalue="cname"
            defaultValue={isAddForm ? newRecordData.categoryId || '' : selectedRow?.categoryId || ''}
            onChange={handleInputChange}
            />*/}
          <TextField
            margin="dense"
            id="purchasePrice"
            name="purchasePrice"
            label="Purchase Price"
            type="text"
            fullWidth
            defaultValue={isAddForm ? newRecordData.purchasePrice : selectedRow?.purchasePrice}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="salePrice"
            name="salePrice"
            label="Sale Price"
            type="text"
            fullWidth
            defaultValue={isAddForm ? newRecordData.salePrice : selectedRow?.salePrice}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            defaultValue={isAddForm ? newRecordData.quantity : selectedRow?.quantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isAddForm ? handleAddRecordSubmit : handleFormSubmit} color="primary">
            {isAddForm ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
