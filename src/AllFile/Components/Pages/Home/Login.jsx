import { Avatar, Box, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../../../firebase.config";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [error, setError] =useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { user, loginUser } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    loginUser(email, password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          title: 'success!',
          text: 'Login successfully',
          icon: 'success',
          confirmButtonText: 'Okay'
        })
        navigate(location?.state ? location.state : '/');
        form.reset();
      })
      .catch(error => {
        console.log(error);
        setError(true);
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className='h-[100vh]'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}