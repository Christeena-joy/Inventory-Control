import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LineChart } from '@mui/x-charts/LineChart';


export default function SalesAccordion({ salesData }) {
    const dates = salesData.map(item => new Date(item.date).toLocaleDateString());
    const salesAmt = salesData.map(item => item.totalAmount);

    // Format data for LineChart component
    const chartData = [
        {
            data: salesAmt,
            xAxis: dates,
        },
    ];
    
    return (
        <div>
            <Accordion sx={{ marginBottom: "40px"}}>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>View Analytics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <LineChart
                        series={chartData}
                        width={500}
                        height={300}
                        xAxis={[{ scaleType: 'point', data: dates }]}
                        xAxisLabel="Date" // Add x-axis label
                        yAxisLabel="Total Sale" // Add y-axis label
                    />
                </AccordionDetails>
            </Accordion>
          
        </div>
    );
}