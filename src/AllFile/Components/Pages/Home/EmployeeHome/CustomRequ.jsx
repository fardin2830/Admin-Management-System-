import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { InputLabel, MenuItem, Select } from '@mui/material';

const defaultTheme = createTheme();

export default function CustomRequ() {
    const { user, createAllUser, loading } = React.useContext(AuthContext);
    // console.log(user);
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const type =age;
    console.log(age);
    const email = user?.email;
    const [value, setValue] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const assetName = data.get('assetName');
        const price = data.get('price');
        const catagory = data.get('catagory');
        const image = data.get('image');
        const need = data.get('need');
        const isAproved = false;
        const additional = data.get('additional');
                axios.post('http://localhost:3000/customreq', {
                    email,assetName,price,catagory,image,need,additional,type,isAproved
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
                        Navigate('/');
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Make a Custom Request
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
                                    name="price"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Asset Price"

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="catagory"
                                    required
                                    fullWidth
                                    id="catagory"
                                    label="Asset Catagory"

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="image"
                                    required
                                    fullWidth
                                    label="Asset Image"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="need"
                                    required
                                    fullWidth
                                    label="Why are you need this ?"
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="additional"
                                    required
                                    fullWidth
                                    label="Additional Imformation"
                                    multiline
                                    rows={2}
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
                            Request
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}