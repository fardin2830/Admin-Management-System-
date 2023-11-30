import { Avatar, Box, Button, Container, CssBaseline, Grid, LinearProgress, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminPanelSettings } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CreatableSelect from 'react-select/creatable';

const options = [
    { value: '5', label: '5 Members for $5' },
    { value: '8', label: '10 Members for $8' },
    { value: '15', label: '20 Members for $15' }
]

const defaultTheme = createTheme();

export default function Joinadmin() {
    const { user, createAllUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || "/";
    const from ="/payment";


    const [value, setValue] = useState(null);
    const [valueOp, setValueOp] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const firstName = data.get('firstName');
        const companyname = data.get('companyname');
        const companylogo = data.get('companylogo');
        const admn = 'admin';
        const memberlimit = 0;

        const day = value.$D;
        const month = value.$M;
        const year = value.$y;
        createAllUser(email, password, firstName, loading)
            .then(result => {
                updateProfile(result.user, {
                    displayName: firstName
                })
                axios.post('http://localhost:3000/admin', {
                    admn, email, firstName, companylogo, companyname,memberlimit, day, month, year
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data.insertedId);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Do you want to continue',
                                icon: 'success',
                                confirmButtonText: 'Yes'
                            })
                            navigate(from, { replace: true });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                if (loading) {
                    return (<Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>);
                }
                form.reset();
            })
            .catch(error => {
                console.log(email, firstName);
                console.error(error);
            })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                        <AdminPanelSettings></AdminPanelSettings>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        JOIN AS HR/ADMIN
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
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="companyname"
                                    required
                                    fullWidth
                                    id="companyname"
                                    label="Company Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="companylogo"
                                    required
                                    fullWidth
                                    id="companylogo"
                                    label="Company Logo"
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
                            <Grid item xs={12}>
                                <CreatableSelect isClearable onChange={(newValue) => setValueOp(newValue)} options={options} />
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