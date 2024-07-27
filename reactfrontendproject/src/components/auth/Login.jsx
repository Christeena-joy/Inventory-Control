import React, { useState } from "react";
import { loginUser } from "./ApiFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { TextField, Button, Stack, Avatar, Paper, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());
    const success = await loginUser(loginData);

    if (success && success.jwt) {
      const token = success.jwt;
      console.log("Response data: ", success);
      console.log("Token from Login.jsx", token);
      auth.handleLogin(token)

      const role = success.user.authorities[0].authority;
      if (role === "ADMIN") {
        navigate("/admin/home", { replace: true });
      } else if (role === "USER") {
        navigate("/user/home", { replace: true });
      }
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
      setOpenSnackbar(true);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '70px auto' };
  const avatarStyle = { backgroundColor: '#12cd12' };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert elevation={6}  onClose={handleCloseSnackbar} severity="error">
              {errorMessage}
            </MuiAlert>
          </Snackbar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField name="username" label="Username" placeholder="Enter Username" variant="standard" fullWidth required />
          <TextField name="password" label="Password" placeholder="Enter Password" type="password" margin="normal" variant="standard" fullWidth required />

          <Stack useFlexGap>
            <Button type="submit" sx={{ marginTop: '30px' }} color="primary" variant="contained" fullWidth >Sign in</Button>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
