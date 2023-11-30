import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Details, Home, Info } from '@mui/icons-material';
import useAsset from '../../../../AuthProvider/useAsset';
import { Avatar, Box, Button, Container, CssBaseline, Grid, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const defaultTheme = createTheme();
export default function Cuslist() {
    const{user,loading}=React.useContext(AuthContext);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const email=user.email;
    const [assetlist, refetch] = useAsset();
    refetch();
    const rows = assetlist;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const assetName = data.get('assetName');
        const price = data.get('price');
        const catagory = data.get('type');
        const image = data.get('image');
        const need = data.get('need');
        const isAproved = false;
        const additional = data.get('additional');
        console.log(assetName);

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        axios.post('http://localhost:3000/customreq', {
            email, assetName, price, catagory, image, need, additional, catagory, isAproved,year,month,day
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
                // Navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm' }}>
            <Table
                stripe="odd"
                hoverRow
                sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
            >
                <caption>My Custom Request List</caption>
                <thead>
                    <tr>
                        <th className='w-[30%]'>Asset Name</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Type</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.assetName} className='text-center'>
                            <td className='text-left'>{row.assetName}</td>
                            <td>{row.quantity}</td>
                            <td>{row.type == 1 ? <h1>Returnable</h1> : <h1>Non-Returnable</h1>}</td>
                            <td>Pending...</td>
                            <td><span onClick={handleOpen}><Info></Info></span></td>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Grid Grid className='w-1/2 ' sx={{ ...style, width: 1000 }}>
                                    <React.Fragment>
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
                                                        Make a Custom Request
                                                    </Typography>
                                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm={12}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="assetName"
                                                                    value={row.assetName}
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
                                                                    value={row.quantity}
                                                                    required
                                                                    fullWidth
                                                                    id="price"
                                                                    label="Asset Price"

                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="type"
                                                                    value={row.type}
                                                                    required
                                                                    fullWidth
                                                                    id="price"
                                                                    label="Type"

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


                                                        </Grid>
                                                        <Grid className='flex gap-3 justify-center'>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{ mt: 3, mb: 2, mr: 3 }}
                                                        >
                                                            Request
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ mt: 3, mb: 2 }}
                                                            onClick={handleClose}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            </Container>
                                        </ThemeProvider>
                                    </React.Fragment>
                                </Grid>
                            </Modal>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
}