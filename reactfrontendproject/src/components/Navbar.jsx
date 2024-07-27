import { AppBar,Toolbar,IconButton, Typography, Stack, Button} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from "react-router-dom";
import Logout from "./auth/Logout";

export const Navbar=()=>{
    const navigate=useNavigate()
    return(
        <AppBar postition='static' sx={{ backgroundColor: '#424242' }}>
            <Toolbar>
               <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
               <AssignmentIcon />   
                </IconButton>   
                <Typography variant="h6"  component='div' sx={{flexGrow:1}}>
                    Inventory Control Hub
                </Typography>
                <Stack direction='row' spacing={2}>
                   {/*} <Button color='inherit' onClick={()=>navigate("/profile")}>PROFILE</Button>*/}
                    <Logout /> 
                   
                    <Button color='inherit' onClick={()=>navigate("/contactus")}>Contact Us</Button>                     
                </Stack>    
            </Toolbar>
        </AppBar>
    )
}