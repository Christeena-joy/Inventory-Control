// UpdateUser.jsx

import React, { useState,useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

export default function UpdateUser({ open, handleClose, selectedRow, handleUpdateUser,updatedUser,setUpdatedUser }) {
    
    useEffect(() => {
        // Update the updatedUser state when selectedRow changes
        if (selectedRow) {
            setUpdatedUser({
                username: selectedRow.username || "",
                email: selectedRow.email || "",
                phoneNo: selectedRow.phoneNo || "",
            });
        }
    }, [selectedRow,setUpdatedUser]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {
        // Validate form data (if needed)
        // Call the handleUpdateUser function with updatedUser data
        handleUpdateUser(updatedUser);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    value={updatedUser.username}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={updatedUser.email}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="phoneNo"
                    name="phoneNo"
                    label="Phone"
                    type="text"
                    fullWidth
                    value={updatedUser.phoneNo}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
