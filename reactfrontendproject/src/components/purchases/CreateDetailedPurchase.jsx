import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getHeader } from '../auth/ApiFunctions';
import Card from '@mui/joy/Card'; // Import Joy UI Card
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl'; // Import Joy UI FormControl
import FormLabel from '@mui/joy/FormLabel';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton'; // Import Joy UI IconButton
import DeleteIcon from '@mui/icons-material/Delete'; // Ensure correct import
import {
    Snackbar,
    Alert,
    Select, // Added import for Select
    MenuItem, // Added import for MenuItem
    Input,
    Grid
} from '@mui/material';

const CreateDetailedPurchase = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productLists, setProductLists] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([{ category: '', product: '', purchasePrice: 0, quantity: 0, totalAmount: 0 }]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(dayjs());

    useEffect(() => {
        const headers = getHeader();

        // Fetch suppliers
        axios.get('http://localhost:8080/admin/suppliers', { headers })
            .then((response) => setSuppliers(response.data))
            .catch(() => setError('Error fetching suppliers'));

        // Fetch categories
        axios.get('http://localhost:8080/admin/categories', { headers })
            .then((response) => setCategories(response.data))
            .catch(() => setError('Error fetching categories'));
    }, []);

    const handleCategoryChange = (index, event) => {
        const newPurchaseItems = [...purchaseItems];
        const categoryId = event.target.value;

        newPurchaseItems[index].category = categoryId;

        const headers = getHeader();

        // Fetch products for this category
        axios.get(`http://localhost:8080/admin/products/category/${categoryId}`, { headers })
            .then((response) => {
                const newProductLists = [...productLists];
                newProductLists[index] = response.data;
                setProductLists(newProductLists);
            })
            .catch(() => setError('Error fetching products for category'));

        setPurchaseItems(newPurchaseItems);
    };

    const handleProductChange = (index, event) => {
        const newPurchaseItems = [...purchaseItems];
        const productId = event.target.value;

        const categoryProducts = productLists[index] || [];
        const selectedProduct = categoryProducts.find((product) => product.pid === productId);

        newPurchaseItems[index].product = productId;
        newPurchaseItems[index]. purchasePrice = selectedProduct ? selectedProduct. purchasePrice : 0;
        newPurchaseItems[index].totalAmount = newPurchaseItems[index]. purchasePrice * (newPurchaseItems[index].quantity || 0);

        setPurchaseItems(newPurchaseItems);
    };

    const handleQuantityChange = (index, event) => {
        const newPurchaseItems = [...purchaseItems];
        const quantity = parseInt(event.target.value, 10);
        const validQuantity = isNaN(quantity) ? '' : quantity;

        newPurchaseItems[index].quantity = validQuantity;
        newPurchaseItems[index].totalAmount = validQuantity * (newPurchaseItems[index]. purchasePrice || 0);

        setPurchaseItems(newPurchaseItems);
    };

    const handleAddProduct = () => {
        setPurchaseItems([...purchaseItems, { category: '', product: '',  purchasePrice: 0, quantity: 0, totalAmount: 0 }]);
    };

    const handleRemoveProduct = (index) => {
        const newPurchaseItems = [...purchaseItems];
        newPurchaseItems.splice(index, 1);
        setPurchaseItems(newPurchaseItems);
    };

    const handleSaveProduct = (index) => {
        const newPurchaseItems = [...purchaseItems];
        newPurchaseItems[index].isSaved = true;
        setPurchaseItems(newPurchaseItems);
    };

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const totalItemQuantity = purchaseItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
            const totalAmount = purchaseItems.reduce((acc, item) => acc + (item.totalAmount || 0), 0);
            console.log("total quantity from handlesubmit: ",totalItemQuantity)

            console.log("Date from handleSubmit: ",purchaseDate.format('YYYY-MM-DD'))

            const purchaseData = {
                purchaseDto: {
                    sid: selectedSupplier,
                    date: purchaseDate.format('YYYY-MM-DD'),
                    totalItemQuantity,
                    totalAmount,
                    paymentStatusId: 2,
                    itemDeliveryStatus: true,
                },
                purchaseItems: purchaseItems
                    .filter((item) => item.isSaved)
                    .map((item) => ({
                        product: { pid: item.product },
                        category: { categoryId: item.category },
                        quantity: item.quantity,
                        totalAmount: item.totalAmount,
                    })),
            };

            await axios.post('http://localhost:8080/admin/purchasetransaction/create', purchaseData, { headers: getHeader() });
            setSuccessMessage('Purchase recorded successfully');
        } catch (error) {
            setError('Error processing purchase');
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            {/* Change: Replace Paper with Card */}
            <Card
                variant="outlined"
                style={{ width: '70%' }}
                sx={{
                    maxHeight: 'max-content',
                    maxWidth: '100%',
                    mx: 'auto',
                    overflow: 'auto',
                    resize: 'horizontal',
                }}
            >
                <Typography level="title-lg" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                    Create a New Purchase
                </Typography>
                <Divider inset="none" />
                {/* Change: Use CardContent to define the form */}
                <CardContent
                    sx={{
                        display: 'grid',
                        gap: 1.5,
                    }}
                >


                    {/* First row with supplier and date */}
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl>
                                <FormLabel>Select Supplier</FormLabel>
                                <Select
                                    value={selectedSupplier}
                                    onChange={(e) => {
                                        const newSupplier = e.target.value;
                                        console.log("Selected supplier:", newSupplier);
                                        setSelectedSupplier(e.target.value)
                                    }}
                                >
                                    {suppliers.map((supplier) => (
                                        <MenuItem key={supplier.sid} value={supplier.sid}>
                                            {supplier.sname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Input
                                    type="date"
                                    value={purchaseDate.format('YYYY-MM-DD')}
                                    onChange={(e) => setPurchaseDate(dayjs(e.target.value))}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Typography level="title-lg" sx={{ textAlign: 'left', marginBottom: '10px' }}>
                        Add Products
                    </Typography>

                    {/* Second row with category, product, quantity, and total amount */}
                    <Grid container spacing={2}>
                        {purchaseItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={2}> {/* Adjusted column width */}
                                    <FormControl fullWidth>
                                        <FormLabel>Select Category</FormLabel>
                                        <Select
                                            value={item.category}
                                            onChange={(e) => handleCategoryChange(index, e)}
                                            disabled={item.isSaved}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                                    {category.cname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2}> {/* Adjusted column width */}
                                    <FormControl fullWidth>
                                        <FormLabel>Select Product</FormLabel>
                                        <Select
                                            value={item.product}
                                            onChange={(e) => handleProductChange(index, e)}
                                            disabled={item.isSaved}
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
                                    <FormControl fullWidth>
                                        <FormLabel>Price per item</FormLabel>
                                        <Input
                                            type="number"
                                            value={item. purchasePrice}
                                            disabled />

                                    </FormControl>
                                </Grid>

                                <Grid item xs={2}> {/* Adjusted column width */}
                                    <FormControl fullWidth>
                                        <FormLabel>Quantity</FormLabel>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e)}
                                            disabled={item.isSaved}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2}> {/* Adjusted column width */}
                                    <FormControl fullWidth>
                                        <FormLabel>Total Amount</FormLabel>
                                        <Input
                                            type="number"
                                            value={item.totalAmount}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                {/* Add/Remove Product */}
                                <CardActions>
                                    <Button
                                        onClick={() => handleSaveProduct(index)}
                                        variant="solid"
                                        color="primary"
                                        disabled={item.isSaved}
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
                                </CardActions>
                            </React.Fragment>
                        ))}

                        {/* Add Product Button */}
                        <Button
                            onClick={handleAddProduct}
                            variant="text"
                            color="primary"
                            sx={{ gridColumn: '1/-1' }} // Change: Adjusted grid-column
                        >
                            + Add Product
                        </Button>
                    </Grid>
                    <Button
                        type="submit"
                        variant="solid"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </CardContent>

                {/* Success and Error Messages */}
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
            </Card>
        </div >
    );
};

export default CreateDetailedPurchase;
