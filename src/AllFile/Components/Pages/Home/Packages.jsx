import { StarBorderOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Container, CssBaseline, GlobalStyles, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const tiers = [
    {
        title: 'Primary',
        price: '5',
        description: [
            '5 users included',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonLink: '/payment',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonLink: '/payment',
        buttonVariant: 'contained',
    },
    {
        title: 'Intermediate',
        price: '8',
        description: [
            '10 users included',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonLink: '/payment',
        buttonVariant: 'outlined',
    },
];
const defaultTheme = createTheme();

export default function Packages() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Quickly build an effective pricing table for your potential customers with
                    this layout. It&apos;s built with default MUI components with little
                    customization.
                </Typography>
            </Container>
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
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
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
                                        <Button fullWidth variant={tier.buttonVariant}>
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