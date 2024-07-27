import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

function preventDefault(event) {
    event.preventDefault();
}

export default function TotalPurchases({totalPurchases}) {
    const formattedTotalPurchases = totalPurchases.toFixed(2); // Ensures only 2 decimal places


    return (
        <React.Fragment>

            <Card 
            sx={{
                maxWidth: 345,
                padding: "20px",
                marginBottom:"20px",
                height: "150px", // Set the height of the card
                backgroundColor: "#4fa664e3", // Set the background color to green
                color: "white", // Set the text color to white
            }}>
                <Typography component="h2" variant="h6" color="white" gutterBottom>
                    Total Purchases
                </Typography>
                <Typography component="p" variant="h4">
                ₹ {formattedTotalPurchases}
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                till {new Date().toLocaleDateString()} {/* Display current date */}
                </Typography>
            </Card>
        </React.Fragment>
    );
}