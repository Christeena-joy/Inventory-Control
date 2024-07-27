// AddUser.jsx

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

export default function AddUser({ open, handleClose, handleAddUser, newUser, setNewUser }) {

    const [formError, setFormError] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

        // Reset formError when user starts typing in any required field
        if (formError && (name === 'username' || name === 'password' || name === 'email' || name === 'phoneNo')) {
            setFormError(false);
        }
    };

    const handleFormSubmit = () => {
        // Call the handleAddUser function with newUser data
        if (!newUser.username || !newUser.password || !newUser.email || !newUser.phoneNo) {
            setFormError(true); // Set formError state to true if any required field is empty
            return;
        }
        handleAddUser(newUser);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                {formError && <div style={{ color: 'red', marginBottom: '10px' }}>All fields are required.</div>}
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    required
                    value={newUser.username}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={newUser.password}
                    required
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={newUser.email}
                    required
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="phoneNo"
                    name="phoneNo"
                    label="Phone"
                    type="text"
                    fullWidth
                    required
                    value={newUser.phoneNo}
                    onChange={handleInputChange}
                />
                {/* Add other form fields (if any) similarly */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
