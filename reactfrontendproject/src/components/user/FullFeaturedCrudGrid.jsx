import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import UpdateUser from "./UpdateUser"; 
import AddUser from "./AddUser";
import MiniDrawer from "../admin/MiniDrawer";

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = useState([]);
    const [newUser, setNewUser] = useState({
      username: "",
      password: "",
      email: "",
      phoneNo: "",
  });
  const [selectedRow, setSelectedRow] = useState(null); // State for storing the selected row for update
  const [updatedUser, setUpdatedUser] = useState({
    // Initialize with the existing user data if selectedRow is available, otherwise use empty strings
    username: selectedRow?.username || "",
    email: selectedRow?.email || "",
    phoneNo: selectedRow?.phoneNo || "",
});


    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [open, setOpen] = useState(false); // State for controlling the visibility of the update form
    const [updatedData, setUpdatedData] = useState({}); // State for storing the updated data from the form
    const [newRecordData, setNewRecordData] = useState({}); // State for storing data of a new record
    const [isAddForm, setIsAddForm] = useState(false);


    const columns = [
        { field: 'username', headerName: 'Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phoneNo', headerName: 'Phone', width: 180 },
        { field: 'authorities', headerName: 'Role', width: 180 },
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
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row)}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/users',{
                headers: getHeader() // Set the headers using the getHeader function
            });
            console.table(response.data)
            const mappedRows = response.data.map(row => ({
                ...row,
                id: row.userId
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
        try {
            console.log(newUser);
            const headers = getHeader();
            console.log("Date sent to backend: ",newUser)
            await axios.post('http://localhost:8080/auth/register', newUser,{headers});
            setOpen(false);
            setNewUser({}); // Clear the new record data after submission
            fetchData(); // Refresh data after adding a new record
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    };

    const handleUpdate = (row) => {
        setSelectedRow(row);
        setOpenUpdateDialog(true); 
        setOpen(true);
    };

    const handleDelete = async (row) => {
        try {
            const headers = getHeader();
            await axios.delete(`http://localhost:8080/admin/users/${row.userId}`,{headers});
            fetchData(); // Refresh data after delete
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRecordData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };
  
    

    const handleFormSubmit = async () => {
        try {
            const headers = getHeader();
            const updatedRow = { ...selectedRow, ...updatedUser }; // Merge selectedRow and updatedData
            console.log("Updated data to be sent to the backend:", updatedUser);
            await axios.put(`http://localhost:8080/admin/users/${selectedRow.userId}`, updatedUser,{headers});
            setOpen(false);
            fetchData(); // Refresh data after update
        } catch (error) {
            console.error('Error updating data:', error);
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
        <h3>User Dashboard</h3>
            <Button variant="contained" color="primary" onClick={handleAddRecord} sx={{marginBottom:'10px'}}>REGISTER NEW USER</Button>
            <DataGrid rows={rows} columns={columns} />
            <UpdateUser
                open={openUpdateDialog}
                handleClose={() => setOpenUpdateDialog(false)}
                selectedRow={selectedRow}
                handleUpdateUser={handleFormSubmit} 
                updatedUser={updatedUser}
                setUpdatedUser={setUpdatedUser}
            />
            <AddUser 
               open={isAddForm}
               handleClose={()=>setIsAddForm(false)}
               handleAddUser={handleAddRecordSubmit}
               newUser={newUser} // Pass newUser state
               setNewUser={setNewUser} // Pass setNewUser function
               />
            </Box>
        
    )
}
