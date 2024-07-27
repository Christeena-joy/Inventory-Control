import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';


export default function TotalSales({totalSales,styles}) {
    const formattedTotalSales = totalSales.toFixed(2); 
    return (
        <React.Fragment>

            <Card 
            sx={styles.card}>
                <Typography component="h2" variant="h6" color="white" gutterBottom>
                    Total Sales
                </Typography>
                <Typography component="p" variant="h4">
                ₹ {formattedTotalSales}
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                till {new Date().toLocaleDateString()} {/* Display current date */}
                </Typography>
            </Card>
        </React.Fragment>
    );
}