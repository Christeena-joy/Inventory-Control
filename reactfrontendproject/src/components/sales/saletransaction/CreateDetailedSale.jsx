import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { processSale } from './SaleApi';
import {
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    IconButton,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // For the remove button
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getHeader } from '../../auth/ApiFunctions';

const CreateDetailedSale = () => {
    const [customers, setCustomers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productLists, setProductLists] = useState([]); // Separate products for each sale item
    const [saleItems, setSaleItems] = useState([{ category: '', product: '', salePrice: 0, quantity: 0, totalAmount: 0 }]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [saleDate, setSaleDate] = useState(dayjs());

    useEffect(() => {
        // Fetch customers and categories
        const headers = getHeader();
        axios.get('http://localhost:8080/user/customers',{headers})
            .then((response) => setCustomers(response.data))
            .catch((error) => setError('Error fetching customers'));

        axios.get('http://localhost:8080/user/categories',{headers})
            .then((response) => setCategories(response.data))
            .catch((error) => setError('Error fetching categories'));
    }, []);



    const handleProductChange = (index, event) => {
        const newSaleItems = [...saleItems];
        const productId = event.target.value;

        const categoryProducts = productLists[index] || [];
        const selectedProduct = categoryProducts.find((product) => product.pid === productId);

        // Set product and price
        newSaleItems[index].product = productId;
        newSaleItems[index].salePrice = selectedProduct ? selectedProduct.salePrice : 0;

        console.log(`Product ID: ${productId}, Price: ${newSaleItems[index].salePrice}`); // Log for debugging

        // Calculate total amount based on quantity and price
        newSaleItems[index].totalAmount = newSaleItems[index].salePrice * newSaleItems[index].quantity;

        setSaleItems(newSaleItems); // Update state
    };


    const handleQuantityChange = (index, event) => {
        const newSaleItems = [...saleItems];
        const quantity = parseInt(event.target.value, 10);

        // If quantity is NaN, set it to 0, otherwise use the parsed quantity
        const validQuantity = isNaN(quantity) ? '' : quantity;
        newSaleItems[index].quantity = validQuantity;
        const salePrice = newSaleItems[index].salePrice;
        const totalAmount = (isNaN(salePrice) ? 0 : salePrice) * (isNaN(quantity) ? 0 : quantity);
        newSaleItems[index].totalAmount = totalAmount;
        setSaleItems(newSaleItems);
    };



    const handleAddProduct = () => {
        setSaleItems([...saleItems, { category: '', product: '', salePrice: 0, quantity: 0, totalAmount: 0, isSaved: false }]);
    };

    const handleRemoveProduct = (index) => {
        const newSaleItems = [...saleItems];
        newSaleItems.splice(index, 1); // Remove the specified product row
        setSaleItems(newSaleItems);
    };

    const handleSaveProduct = (index) => {
        const newSaleItems = [...saleItems];
        newSaleItems[index].isSaved = true; // Mark the product row as saved
        setSaleItems(newSaleItems);
    };

    const handleDateChange = (date) => {
        setSaleDate(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Calculate total quantity and total amount for the entire sale
            const totalQuantity = saleItems.reduce((acc, item) => acc + (item.quantity || 0), 0); // Handle possible null values
            const totalAmount = saleItems.reduce((acc, item) => acc + (item.totalAmount || 0), 0); // Handle possible null values
    
            const saleData = {
                saleDto: {
                    customerId: selectedCustomer,
                    date: saleDate.format('YYYY-MM-DD'), // Ensure correct date format
                    totalQuantity,
                    totalAmount,
                    paymentStatusId: 2, // Fixed value as specified
                    itemDeliveryStatus: true, // Fixed value as specified
                },
                saleItems: saleItems
                    .filter((item) => item.isSaved) // Only include saved items
                    .map((item) => ({
                        product: { pid: item.product },
                        category: { categoryId: item.category },
                        quantity: item.quantity,
                        totalAmount: item.totalAmount,
                    })),
            };
    
            await processSale(saleData); // Send the sale data to the backend
            setSuccessMessage('Sale processed successfully'); // Show success message
        } catch (error) {
            setError('Error processing sale'); // Show error message on failure
        }
    };
    


    const iconPath = '/img/sale.png';

    const handleCategoryChange = (index, event) => {
        const newSaleItems = [...saleItems];
        const categoryId = event.target.value;
        console.log("Category Id from handleCategoryChange :", categoryId)

        newSaleItems[index].category = categoryId;

        const headers=getHeader();

        // Fetch products for this specific category
        axios
            .get(`http://localhost:8080/user/products/category/${categoryId}`,{headers})
            .then((response) => {

                const newProductLists = [...productLists];
                newProductLists[index] = response.data; // Store fetched products at the correct index
                setProductLists(newProductLists); // Update state with the new product list
                console.table(response)
                console.log("new ProductList from CategoryId: ", newProductLists)
            })
            .catch(() => setError('Error fetching products from category'));

        setSaleItems(newSaleItems);
        console.log('Sale Items from handleCategorychange:', saleItems); // Check the current state of sale items
        console.log('Product Lists from handlecategorychange:', productLists); // Check if product lists are correct
    };



    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Paper style={{ padding: '20px', maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <img src={iconPath} alt="Sale Icon" style={{ height: '40px', width: '40px' }} />
                </div>
                <Typography variant="h5" sx={{  textAlign: 'center' }}>
                    Create a New Sale
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center" >
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ padding: '10px' }}>
                                <InputLabel>Select Customer</InputLabel>
                                <Select
                                    value={selectedCustomer}
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                >
                                    {customers.map((customer) => (
                                        <MenuItem key={customer.customerId} value={customer.customerId}>
                                            {customer.cname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Date"
                                        value={saleDate}
                                        onChange={handleDateChange}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Add Products</h3>
                        </Grid>

                        {saleItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid container spacing={1} alignItems="center" >
                                    <Grid item xs={2}  >
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>Select Category</InputLabel>
                                            <Select
                                                value={item.category}
                                                onChange={(e) => handleCategoryChange(index, e)}
                                                disabled={item.saved} // Disable if saved
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category.categoryId} value={category.categoryId}>
                                                        {category.cname}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>Select Product</InputLabel>
                                            <Select
                                                value={item.product}
                                                onChange={(e) => handleProductChange(index, e)}
                                                disabled={item.saved} // Disable if saved
                                            >
                                                {productLists[index]?.map((product) => (
                                                    <MenuItem key={product.pid} value={product.pid}>
                                                        {product.pname}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            type="number"
                                            label="Quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e)}
                                            disabled={item.saved} // Disable if saved
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            type="number"
                                            label="Price per Item"
                                            value={item.salePrice}
                                            disabled // Non-editable
                                            fullWidth
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl sx={{ m: 1 }} variant="standard">
                                            <TextField
                                                type="number"
                                                value={item.totalAmount}
                                                variant='standard'
                                                label="Total"
                                                disabled
 
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            onClick={() => handleSaveProduct(index)}
                                            variant="contained"
                                            color="primary"
                                            disabled={item.saved} // Disable if already saved

                                        >
                                            Save
                                        </Button>
                                        <IconButton
                                            onClick={() => handleRemoveProduct(index)}
                                            color="secondary"
                                            aria-label="Remove Product"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={3}>
                            <Button
                                onClick={handleAddProduct}
                                variant="text"
                                color="primary"
                            >
                                +Add Product
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                    <Alert onClose={() => setSuccessMessage('')} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Paper>
        </div>
    );
};

export default CreateDetailedSale;
