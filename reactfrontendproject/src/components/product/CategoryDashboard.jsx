import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, Snackbar,
    Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import MiniDrawer from "../admin/MiniDrawer";

export default function CategoryDashboard() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [newRecordData, setNewRecordData] = useState({});
    const [isAddForm, setIsAddForm] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Add state for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to show in Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of Snackbar message


    const columns = [
        { field: 'cname', headerName: 'Category', width: 280, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 280,
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
                  </Button>  */}
                </ButtonGroup>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const headers = getHeader();
            const response = await axios.get('http://localhost:8080/admin/categories', { headers });
            const mappedRows = response.data.map(row => ({
                ...row,
                id: row.categoryId
            }));
            setRows(mappedRows);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage("Error fetching data");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleAddRecord = () => {
        setSelectedRow(null);
        setIsAddForm(true);
        setOpen(true);
    };

    const handleAddRecordSubmit = async () => {

        if (!newRecordData.cname) {
            // Check for required fields
            setSnackbarMessage("Please provide a category name");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return; // Stop further processing if required fields are empty
        }
        try {
            const headers = getHeader();
            await axios.post('http://localhost:8080/admin/categories', newRecordData, { headers });
            setOpen(false);
            setNewRecordData({});
            fetchData();
            setSnackbarMessage("Category added successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error adding new record:', error);
            setSnackbarMessage("Error adding category");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);

        }
    };

    const handleUpdate = (row) => {
        setIsAddForm(false);
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

        if (!updatedData.cname||!selectedRow.cname) {
            // Check for required fields
            setSnackbarMessage("Please provide a category name");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return; // Stop further processing if required fields are empty
        }

        try {
            const headers = getHeader();
            const updatedRow = { ...selectedRow, ...updatedData };
            await axios.put(`http://localhost:8080/admin/categories/${selectedRow.categoryId}`, updatedRow, { headers });
            setOpen(false);
            fetchData();
            setSnackbarMessage("Category updated successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating data:', error);
            setSnackbarMessage("Error updating category");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleDelete = async (row) => {
        try {
            const headers = getHeader();
            await axios.delete(`http://localhost:8080/admin/categories/${row.categoryId}`, { headers });
            fetchData(); // Refresh data after delete
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <Box m={2} sx={{
            height: 500,
            width: '40%',
            marginTop: '100px',
            marginLeft: '100px',
        }}>
            <MiniDrawer />
            <Button variant="contained" color="primary" onClick={handleAddRecord}>Add Category</Button>
            <h3>Category Listing</h3>
            <DataGrid rows={rows} columns={columns} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isAddForm ? 'Create Category' : 'Update Category'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cname"
                        name="cname"
                        label="Category"
                        type="text"
                        fullWidth
                        defaultValue={isAddForm ? newRecordData.cname : selectedRow?.cname}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={isAddForm ? handleAddRecordSubmit : handleFormSubmit} color="primary">
                        {isAddForm ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar for Success/Error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
