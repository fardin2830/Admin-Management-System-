import { Avatar, Box, Button, Container, CssBaseline, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Home } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function CustomRequest() {
    const { user, createAllUser, loading } = useContext(AuthContext);
    // console.log(user);
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const type = age;
    console.log(age);
    const email = user?.email;
    const [value, setValue] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const assetName = data.get('assetName');
        const quantity = data.get('quantity');
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        console.log(assetName, quantity, type, today, year, month, day);
        axios.post('http://localhost:3000/asset', {
            email,assetName,quantity,type,year, month, day
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
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                        <Home></Home>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Asset Here
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="assetName"
                                    required
                                    fullWidth
                                    id="assetName"
                                    label="Asset Name"

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="quantity"
                                    required
                                    fullWidth
                                    id="quantity"
                                    label="Asset Quantity"

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <InputLabel id="demo-simple-select-helper-label" className='mb-2'>Asset Type</InputLabel>
                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    value={age}
                                    onChange={handleChange}
                                    className='w-full'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Returnable</MenuItem>
                                    <MenuItem value={2}>Non-Returnable</MenuItem>
                                </Select>
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add an Asset
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}