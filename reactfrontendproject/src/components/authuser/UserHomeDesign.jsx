import { Box, Container, Typography, Grid } from "@mui/material"
import MiniDrawer from "./UserMiniDrawer";
import { getTotalSales } from "../sales/SalesFunctions";
import TotalSales from "../sales/TotalSales";
import { useState, useEffect } from "react";
import DateTimeCard from "../common/DateTimeCard";
import DarkThemeCards from "./UserDarkThemeCards";
import UserMiniDrawer from "./UserMiniDrawer";

export const UserHomeDesign = () => {
    const [totalSales, setTotalSales] = useState(0);



    useEffect(() => {
        fetchTotalSales();
    }, []);



    const fetchTotalSales = async () => {
        try {
            const totalSalesData = await getTotalSales();
            setTotalSales(totalSalesData);
        } catch (error) {
            console.error('Error fetching total sales:', error);
        }
    };


    const totalSalesStyles = {
        card: {
            maxWidth: 500,
            padding: "20px",
            marginBottom: "5px",
            marginTop: "100px",
            height: "150px", // Set the height of the card
            marginLeft: "60px",
            backgroundColor: "#3e87c5", // Set the background color to green
            color: "white", // Set the text color to white
        }
    };


    return (
        <Box sx={{ backgroundColor: '#ebf6ffb0', minHeight: '100vh' }}>
            <UserMiniDrawer />
            <Container maxWidth="lg">

                <Grid container rowSpacing={0} columnSpacing={{xs:1,sm:1,md:1}} alignItems="flex-start">
                    <Grid item lg={6}>
                        <TotalSales totalSales={totalSales} styles={totalSalesStyles} />
                    </Grid>
                    <Grid item lg={6} >
                        <DateTimeCard />
                    </Grid>
                   
                </Grid>

                <Typography variant="h4" align="center" style={{ marginTop: "60px" }}>
                    Welcome to <span style={{ fontWeight: "bold", color: "#1b8fcc" }}>Inventory</span> <span style={{ color: "#16b245" }}>Control</span> <span style={{ fontStyle: "italic", color: "#5e98c0" }}>Hub</span> Application
                </Typography>
            </Container>

            <DarkThemeCards />
        </Box>
    )
}