import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, ButtonGroup, Radio, FormControlLabel, MenuItem, RadioGroup, Typography } from "@mui/material";
import axios from 'axios';
import { getHeader } from "../auth/ApiFunctions";
import TotalPurchases from "./TotalPurchases";
import PurchasesAccordion from "./PurchasesAccordion";
import PendingPurhases from "./PendingPurchases";
import MiniDrawer from "../admin/MiniDrawer";
import { useNavigate } from 'react-router-dom';

export default function PurchasesCrud() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newRecordData, setNewRecordData] = useState({});
  const [isAddForm, setIsAddForm] = useState(false);
  const [options, setOptions] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    sid: isAddForm ? newRecordData.sid || '' : selectedRow?.sid || '',
    date: isAddForm ? newRecordData.date : selectedRow?.date,
    totalItemQuantity: isAddForm ? newRecordData.totalItemQuantity : selectedRow?.totalItemQuantity,
    totalAmount: isAddForm ? newRecordData.totalAmount : selectedRow?.totalAmount,
    paymentStatusId: isAddForm ? newRecordData.paymentStatusId || '' : selectedRow?.paymentStatusId || '',
    itemDeliveryStatus: isAddForm ? newRecordData.itemDeliveryStatus : selectedRow?.itemDeliveryStatus
  });


  const columns = [
    { field: 'supplierName', headerName: 'Supplier Name', width: 180 },
    { field: 'date', headerName: 'Date', width: 180 },
    { field: 'totalItemQuantity', headerName: 'Total Quantity', width: 150 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 150 },
    {
      field: 'paymentStatusId',
      headerName: 'Payment Status',
      width: 180,
      renderCell: (params) => {
        const paymentStatus = params.value === 2 ? 'Paid' : 'Pending';
        return paymentStatus;
      }
    },
    { field: 'itemDeliveryStatus', headerName: 'Delivery Status', width: 180, renderCell: (params) => params.value ? 'Delivered' : 'Pending' },
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
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  useEffect(() => {
    fetchSuppliers();
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalPurchases();
  }, [rows]);



  const fetchData = async () => {
    try {
      const headers = getHeader();
      const response = await axios.get('http://localhost:8080/admin/purchases', { headers });
      const salesMap = new Map();
      response.data.forEach(item => {
          const date = item.date;
          const totalAmount = item.totalAmount;
          if (salesMap.has(date)) {
              salesMap.set(date, salesMap.get(date) + totalAmount);
          } else {
              salesMap.set(date, totalAmount);
          }
      });

      // Format aggregated data
      const relevantData = Array.from(salesMap, ([date, totalAmount]) => ({ date, totalAmount }));

      const sortedData = relevantData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSalesData(sortedData);
      console.log("Purchases data from backend:");
      console.table(response.data);
      const mappedRows = response.data.map(async row => {
        // Fetch supplier name using supplierId
        const supplierResponse = await axios.get(`http://localhost:8080/admin/suppliers/${row.sid}`, { headers });
        const supplierName = supplierResponse.data.sname;
        return {
          ...row,
          id: row.purchaseId,
          supplierName: supplierName // Add supplierName to the row
        };
      });
      // Wait for all promises to resolve and then set rows
      Promise.all(mappedRows).then(mappedRowsData => setRows(mappedRowsData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const fetchSuppliers = async () => {
    try {
      const headers = getHeader();
      const response = await axios.get('http://localhost:8080/admin/suppliers', { headers });
      console.table(response.data);
      const mappedRows = response.data.map(option => ({
        ...option,
        id: option.sid
      }));
      setOptions(mappedRows);
      console.log("Suppliers data from backend:", options)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalPurchases = () => {
    const total = rows.reduce((acc, curr) => acc + curr.totalAmount, 0);
    console.log("Total Purchases:", total);
    setTotalPurchases(total);
  };

  const handleAddRecord = () => {
    setSelectedRow(null);
    setIsAddForm(true);
    setOpen(true);
    // Set newRecordData with initial values
    const initialDetails = {
      sid: '',
      date: new Date().toISOString().split('T')[0], // Set today's date as initial value
      totalItemQuantity: '',
      totalAmount: '',
      paymentStatusId: '',
      itemDeliveryStatus: false // Assuming it's a boolean value
    };
    setNewRecordData(initialDetails); // Set newRecordData
    setDetails(initialDetails); // Set details
  };



  const handleUpdate = (row) => {
    setSelectedRow(row);
    setIsAddForm(false);
    setOpen(true);

    setDetails({
      sid: row.sid,
      date: row.date,
      totalItemQuantity: row.totalItemQuantity,
      totalAmount: row.totalAmount,
      paymentStatusId: row.paymentStatusId,
      itemDeliveryStatus: row.itemDeliveryStatus
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      const headers = getHeader();
      await axios.delete(`http://localhost:8080/admin/purchases/${row.purchaseId}`, { headers });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For radio buttons, directly use the boolean value
    if (name === 'deliveryStatus') {
      const itemDeliveryStatus = value === 'true';
      setDetails((prev) => ({
        ...prev,
        itemDeliveryStatus: itemDeliveryStatus
      }));
      setNewRecordData((prev) => ({
        ...prev,
        itemDeliveryStatus: itemDeliveryStatus
      }));
    } else if (name === 'sid') {
      // Fetch the selected supplier object
      const selectedSupplier = options.find(option => option.sid === parseInt(value));
      setDetails((prev) => ({
        ...prev,
        sid: value,
      }));
      setNewRecordData((prev) => ({
        ...prev,
        sid: value,
        supplierName: selectedSupplier ? selectedSupplier.sname : '',
      }));
    } else {
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
      setNewRecordData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  };


  const handleAddPurchase = () => {
    navigate('/purchasetransaction/create'); 
  }



  const handleFormSubmit = async () => {
    try {
      const headers = getHeader();
      const updatedRow = { ...selectedRow, ...newRecordData };
      console.log("Update data sent to database: ", updatedRow);
      await axios.put(`http://localhost:8080/admin/purchases/${selectedRow.purchaseId}`, updatedRow, { headers });
      setOpen(false);
      setNewRecordData({});
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAddRecordSubmit = async () => {
    try {
      const headers = getHeader();
      console.log("Data being sent in the POST request:", newRecordData);
      await axios.post('http://localhost:8080/admin/purchases', newRecordData, { headers });
      setOpen(false);
      setNewRecordData({});
      fetchData();
    } catch (error) {
      console.error('Error adding new record:', error);
    }
  };

  return (
    <Box m={2} sx={{
      height: 500,
      width: '100%',
      marginTop: '100px',
      marginLeft: '100px',
    }}>
      <MiniDrawer />
      <TotalPurchases totalPurchases={totalPurchases} />

      <PendingPurhases />

      <PurchasesAccordion salesData={salesData} />
      <Button variant="contained" color="primary" onClick={handleAddPurchase} sx={{marginBottom:"10px"}}>
        Add Purchase
      </Button>
      <DataGrid rows={rows} columns={columns} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddForm ? 'Add New Purchase' : 'Update Purchase'}</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            id="sid"
            name="sid"
            label="Supplier Name"
            fullWidth
            value={details.sid}
            onChange={handleInputChange}
            disabled
          >
            {options.map((option) => {
              //console.log("selected option is: ", option[backendkey], option[backendvalue]); // Log the option object
              return (
                <MenuItem key={option.sid} value={option.sid}>
                  {option.sname}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={details.date}
            onChange={handleInputChange}
            disabled
          />

          <TextField
            margin="dense"
            id="totalItemQuantity"
            name="totalItemQuantity"
            label="Total Quantity"
            type="text"
            fullWidth
            value={details.totalItemQuantity}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            margin="dense"
            id="totalAmount"
            name="totalAmount"
            label="Total Amount"
            type="text"
            fullWidth
            value={details.totalAmount}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            select
            margin="dense"
            id="paymentStatusId"
            name="paymentStatusId"
            label="Payment Status"
            fullWidth
            value={details.paymentStatusId}
            onChange={handleInputChange}
          >
            <MenuItem value="1">Pending</MenuItem>
            <MenuItem value="2">Paid</MenuItem>
          </TextField>

          <Typography variant="subtitle1" gutterBottom>
            Delivery Status
          </Typography>
          <RadioGroup
            aria-label="delivery-status"
            name="deliveryStatus"
            value={details.itemDeliveryStatus ? 'true' : 'false'}
            onChange={(e) => handleInputChange(e)}
          >
            <FormControlLabel value="true" control={<Radio size="small" color="secondary" />} label="Delivered" />
            <FormControlLabel value="false" control={<Radio size="small" color="secondary" />} label="Pending" />
          </RadioGroup>

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
    </Box>
  );
}
