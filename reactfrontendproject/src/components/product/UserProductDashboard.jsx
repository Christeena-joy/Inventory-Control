import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import UserMiniDrawer from "../authuser/UserMiniDrawer";



export default function UserProductDashboard() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  

  const columns = [
    { field: 'pname', headerName: 'Product', width: 180 },
    { field: 'categoryName', headerName: 'Category', width: 180 },
    { field: 'purchasePrice', headerName: 'Purchase Price', width: 180, editable: true },
    { field: 'salePrice', headerName: 'Sale Price', width: 180, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 180, editable: true },
  ];

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
        const headers = getHeader();
        const [productsResponse, categoriesResponse] = await Promise.all([
            axios.get('http://localhost:8080/user/products', { headers }),
            axios.get('http://localhost:8080/user/categories', { headers }),
        ]);
        console.log("Data from backend")
        console.table("Product response from backend: ",productsResponse.data)
        const products = productsResponse.data;
        const categoriesMap = {}; // Map category IDs to their names

        // Create a map of category IDs to their names
        categoriesResponse.data.forEach(category => {
            categoriesMap[category.categoryId] = category.cname;
        });
        console.log("Categories Mapping: ",categoriesMap)

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


  return (
    <Box m={2} sx={{
      height: 500,
      width: '80%',
      marginTop: '100px',
      marginLeft:'100px',
    }}>
       <UserMiniDrawer /> 
       <h1>Available Products</h1>    
      <DataGrid rows={rows} columns={columns} />
    </Box>
  )
}
