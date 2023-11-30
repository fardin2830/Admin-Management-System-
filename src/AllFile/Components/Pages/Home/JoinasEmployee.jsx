import { Badge, Home } from "@mui/icons-material";
import { Avatar, Box, Button, Container, CssBaseline, Grid, LinearProgress, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function Joinemployee() {
    const { user, createAllUser, loading } = useContext(AuthContext);
    // console.log(user);
    const [value, setValue] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const firstName = data.get('firstName');
        const dateofbirth = data.get('dateofbirth');
        const empl = 'employee';
        const day = value.$D;
        const month = value.$M;
        const year = value.$y;
        console.log(email, firstName, day);
        createAllUser(email, password, firstName, loading)
            .then(result => {
                console.log(result.user);
                console.log(email, firstName, dateofbirth);
                updateProfile(result.user, {
                    displayName: firstName
                })
                axios.post('http://localhost:3000/employee', {
                    empl,email, firstName, day, month, year
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data.insertedId);
                        console.log(email, firstName, dateofbirth);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Do you want to continue',
                                icon: 'success',
                                confirmButtonText: 'Yes'
                            })
                        }
                        navigate(location?.state ? location.state : '/');
                        form.reset();
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(email, firstName, dateofbirth);
                    });
                if (loading) {
                    return (<Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>);
                }
                form.reset();
            })
            .catch(error => {
                console.log(error);
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
                        <Badge></Badge>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        JOIN AS EMPLOYEE
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}