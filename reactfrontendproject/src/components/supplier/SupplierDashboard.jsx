import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup,Snackbar,Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import MiniDrawer from "../admin/MiniDrawer";


export default function SupplierDashboard() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false); // State for controlling the visibility of the update form
    const [selectedRow, setSelectedRow] = useState(null); // State for storing the selected row for update
    const [updatedData, setUpdatedData] = useState({}); // State for storing the updated data from the form
    const [newRecordData, setNewRecordData] = useState({}); // State for storing data of a new record
    const [isAddForm, setIsAddForm] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Add state for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to show in Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of Snackbar message

    const columns = [
        { field: 'sname', headerName: 'Name', width: 180, editable: true },
        { field: 'email', headerName: 'Email', width: 180, editable: true },
        { field: 'phone', headerName: 'Phone', width: 180, editable: true },
        { field: 'address', headerName: 'Address', width: 180, editable: true },
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
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const headers = getHeader();
            const response = await axios.get('http://localhost:8080/admin/suppliers',{headers});
            const mappedRows = response.data.map(row => ({
              ...row,
              id: row.sid
          }));
          setRows(mappedRows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddRecord = () => {
        setSelectedRow(null); // Clear the selected row
        setIsAddForm(true); // Set the form mode to add
        setOpen(true);
    };

    const handleAddRecordSubmit = async () => {
        if (validateForm(newRecordData)) {
            try {
                const headers = getHeader();
                await axios.post('http://localhost:8080/admin/suppliers', newRecordData, { headers });
                setOpen(false);
                setNewRecordData({});
                fetchData();
                setSnackbarSeverity("success");
                setSnackbarMessage("Supplier added successfully!");
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error adding new record:', error);
                setSnackbarSeverity("error");
                setSnackbarMessage("Error adding supplier!");
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarSeverity("error");
            setSnackbarMessage("Please fill all fields!");
            setSnackbarOpen(true);
        }
    };

    const validateForm = (data) => {
        return data.sname && data.email && data.phone && data.address;
    };

    const handleUpdate = (row) => {
        setSelectedRow(row);
        setIsAddForm(false); // Set the form mode to update
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (row) => {
        try {
            const headers = getHeader();
            await axios.delete(`http://localhost:8080/admin/suppliers/${row.sid}`,{headers});
            fetchData(); // Refresh data after delete
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
                await axios.put(`http://localhost:8080/admin/suppliers/${selectedRow.sid}`, updatedRow, { headers });
                setOpen(false);
                fetchData();
                setSnackbarSeverity("success");
                setSnackbarMessage("Supplier updated successfully!");
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error updating data:', error);
                setSnackbarSeverity("error");
                setSnackbarMessage("Error updating supplier!");
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarSeverity("error");
            setSnackbarMessage("Please fill all fields!");
            setSnackbarOpen(true);
        }
    };

    return (
        <Box m={2} sx={{
            height: 500,
            width: '80%',
            marginTop: '100px',
            marginLeft:'100px',
        }}> 
            <MiniDrawer/>
            <Button variant="contained" color="primary" onClick={handleAddRecord}
            sx={{marginBottom:"10px"}}>Add Supplier</Button>
            <DataGrid rows={rows} columns={columns} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isAddForm ? 'Add Supplier' : 'Update Supplier'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sname"
                        name="sname"
                        label="Name"
                        type="text"
                        fullWidth
                        defaultValue={isAddForm ? newRecordData.sname : selectedRow?.sname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        defaultValue={isAddForm ? newRecordData.email : selectedRow?.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        defaultValue={isAddForm ? newRecordData.phone : selectedRow?.phone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        defaultValue={isAddForm ? newRecordData.address : selectedRow?.address}
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
