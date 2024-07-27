import { Box, Card, CardContent, Container, Typography, Grid } from "@mui/material"
import homedata from './Userhomedata.json'
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";

export const UserHome = () => {

    return (
        <Box sx={{ backgroundColor: '#e7e4e4', minHeight: '100vh' }}>
        <Container maxWidth="lg">
            <Navbar/>
            <Typography variant="h4" align="center" style={{ marginTop: "60px" }} >
                Welcome to Inventory Control Hub Application
            </Typography>
            <Grid container spacing={5} style={{ marginTop: "20px" }} justifyContent="Center">
                {homedata.map((result, index) => (
                    <Grid item xs={12} ms={4} sm={4} key={index}>
                        <Card sx={{ maxWidth: 345 }} style={{padding:"10xp",marginBottom:"30px"}}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={result.img}
                                style={{borderRadius:"5px"}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {result.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   {result.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={result.link} size="small">GO TO PAGE</Button>                                
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
       </Box> 
    )
    
}