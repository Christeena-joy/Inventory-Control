import * as React from 'react';
import { Card, Typography } from '@mui/material';

export default function DateTimeCard() {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    // Update current time every second
    React.useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup function to clear interval
        return () => clearInterval(timerID);
    }, []);

    return (
        <Card sx=
        {{ maxWidth: 345, 
        padding: '20px', 
        marginBottom: '20px',
        marginTop:'100px',
        marginLeft:'50px',
        backgroundImage: `url('/img/homecards/42605.jpg')`, // Specify the background image URL
        backgroundSize: 'cover', // Cover the entire card with the background image
         }}>
            <Typography variant="body1" gutterBottom style={{ color: '#4f7188de' }}>
                {currentTime.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#4f7188de' }}>
                {currentTime.toLocaleTimeString()}
            </Typography>
            {/* Optional: Display a clock */}
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Clock />
            </div>
        </Card>
    );
}

// Optional: Clock component
function Clock() {
    const [time, setTime] = React.useState(new Date());

    // Update time every second
    React.useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup function to clear interval
        return () => clearInterval(timerID);
    }, []);

    return (
        <Typography variant="h4" style={{ color: '#4f7188de' }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Typography>
    );
}
