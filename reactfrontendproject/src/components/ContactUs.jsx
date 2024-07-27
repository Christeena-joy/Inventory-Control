import { Avatar, Button, Grid, Paper, TextField,Stack } from "@mui/material";
import React from "react";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const ContactUs=()=>{
    const paperStyle={padding:20,height:'70vh', width:280,margin:'70px auto'}
    const avatarStyle={backgroundColor:'rgb(178 54 184)'}
    return(
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
        <Avatar style={avatarStyle}><ContactPhoneIcon/></Avatar>
            <h2>Contact Us</h2>
        </Grid>
        <TextField label='Enter your email' placeholder="Enter Email"  variant="standard" fullWidth required />
        <TextField label='Describe the issue/suggestion' placeholder="Describe the concerns" margin="normal" variant="standard" fullWidth required />
        
    <Stack useFlexGap>
        <Button type='submit' sx={{ marginTop: '30px' }} color="success" variant="contained" fullWidth >Submit</Button>
    </Stack>
        </Paper>
    </Grid>
        
    )
}
export default ContactUs;