import { Avatar, Button, Grid, Paper, TextField,Stack } from "@mui/material";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const Login=()=>{
    const paperStyle={padding:20,height:'70vh', width:280,margin:'70px auto'}
    const avatarStyle={backgroundColor:'#12cd12'}
return(
    <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Sign In</h2>
        </Grid>
        <TextField label='Username' placeholder="Enter Username"  variant="standard" fullWidth required />
        <TextField label='Password' placeholder="Enter Password" type="password" margin="normal" variant="standard" fullWidth required />
        
    <Stack useFlexGap>
        <Button type='submit' sx={{ marginTop: '30px' }} color="primary" variant="contained" fullWidth >Sign in</Button>
    </Stack>
        </Paper>
    </Grid>
)
}
export default Login