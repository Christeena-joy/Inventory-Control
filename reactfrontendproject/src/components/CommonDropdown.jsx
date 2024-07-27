import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem, TextField } from '@mui/material';

const CommonDropdown = ({ apiUrl, id, label, name, backendkey, backendvalue, defaultValue, onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.table(response.data);
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    const handleChange = (event) => {
        const { value } = event.target;
        console.log("Selected value from handleChange:", event.target.value,event.target.name); 
        setSelectedValue(value); // Update selectedValue when an option is selected
        onSelect(event); // Call the onSelect function passed from the parent component
    };


    return (
        <TextField
            select
            margin="dense"
            id={id}
            name={name}
            label={label}
            fullWidth
            value={selectedValue}
            onChange={handleChange}
        >
            {options.map((option) => {
                console.log("selected option is: ",option[backendkey],option[backendvalue]); // Log the option object
                return (
                    <MenuItem key={option[backendkey]} value={option[backendkey]}>
                        {option[backendvalue]}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default CommonDropdown;
