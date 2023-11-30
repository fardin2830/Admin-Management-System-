import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, CssBaseline, GlobalStyles, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import useAdminData from "../../../../AuthProvider/useAdminData";
import { NavLink } from "react-router-dom";
import { StarBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";


const tiers = [
    {
        title: 'Primary',
        price: '5',
        user: 5,
        description: [
            '5 users included',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Buy Now',
        buttonLink: '/payment',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        user: 20,
        description: [
            '20 users included',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Buy Now',
        buttonLink: '/payment',
        buttonVariant: 'contained',
    },
    {
        title: 'Intermediate',
        price: '8',
        user: 10,
        description: [
            '10 users included',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Buy Now',
        buttonLink: '/payment',
        buttonVariant: 'outlined',
    },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PackPay() {
    const { user, loading } = useContext(AuthContext);
    const [admin,refetch] = useAdminData();

    const adm = admin?.filter((adm) => adm?.email == user?.email);
    console.log(adm[0]);


    if (loading) {
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }

    const handleMember = async (event) => {
        const mm = adm[0]?.memberlimit;
        const add = parseInt(event.target.value);
        refetch();
        const ml = mm + add;
        console.log(mm + add);
        const userrrr = {
            email: adm[0]?.email,
            memberlimit: ml
        };
        console.log(userrrr);
        axios.patch('http://localhost:3000/admin', userrrr)
            // .then(res => console.log(res.data.matchedCount))
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Member Limit has been Updated`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

            .catch(error => console.log(error))
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarBorderOutlined></StarBorderOutlined> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        component="form"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}

                                    >
                                        <Typography name='price' component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <div className=' flex justify-center mx-auto mb-3'>
                                    <NavLink to={tier.buttonLink}>
                                        <Button fullWidth variant={tier.buttonVariant} onClick={handleMember} value={tier.user}>
                                            {tier.buttonText}
                                        </Button>
                                    </NavLink>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* End footer */}
        </ThemeProvider>
    );
}