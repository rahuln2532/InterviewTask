import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid, Icon, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from "../context/auth/authContext";

export default function CardComponent() {

    const { data, setData } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [cartSize, setCartsize] = useState();
    console.log(cartSize);

    const navigate = useNavigate();

    console.log("user data in cont4ext", user);
    const next = (id) => {
        const itemToAdd = data.find((item) => item.id === id);
        if (itemToAdd) {
            const updatedCart = [...cart, { ...itemToAdd, qty: 1 }];
            localStorage.setItem('buy', JSON.stringify(updatedCart));
            navigate(`/checkOut`);
        }

    }


    const addToCart =(id) => {
        const itemToAdd = data.find((item) => item.id === id);
        if (itemToAdd) {
            const updatedCart = [...cart, { ...itemToAdd, qty: 1 }];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            const cartData = JSON.parse(localStorage.getItem('cart'));
            setCartsize(cartData);
        }
    }


    const openCart = () => {
        navigate('/checkOut');
    }
    useEffect(() => {
        
        const cartData = JSON.parse(localStorage.getItem('cart'));
        setCartsize(cartData);
    }, []);




    return (
        <Box
            component='div'

        >
            <Stack
                direction='column'
                spacing={5}
            >

                <Paper>
                    <Box paddingBottom={10} paddingTop={10}>
                        <Button variant="text" onClick={openCart}>
                            <Box
                                component="span"
                                sx={{
                                    position: "fixed",
                                    right: 20,
                                    top: "10%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1100,
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    p: 1,
                                    borderRadius: "50%",
                                    display: "flex",
                                    cursor: "pointer",
                                    boxShadow: 3
                                }}
                            >

                                <ShoppingCartIcon />

                            </Box>
                        </Button>

                        <Grid container sx={{ m: "auto", justifyContent: "center" }} spacing={3}>{
                            data.map((product) =>
                                <Grid item xs={12} sm={3} md={4} lg={6} key={product.id}>
                                    <Card
                                        sx={{
                                            maxWidth: 300,
                                            minWidth: 300,
                                            maxHeight: 400,
                                            minHeight: 400,
                                            borderRadius: 3,
                                            boxShadow: 4,
                                            mx: "auto",
                                            position: "relative",
                                            display: "flex",
                                            flexDirection: "column"

                                        }}
                                    >

                                        <CardMedia
                                            component="img"
                                            height="200"
                                            width="150"
                                            image={product.imageUrl}
                                            alt={product.name}
                                        />

                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                flexGrow: 1,
                                            }}>
                                            <Typography variant="h6" fontWeight="bold" noWrap>
                                                {product.name}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {product.description}
                                            </Typography>

                                            {/* Price section */}
                                            <Box display="flex" alignItems="center" gap={1} sx={{ mb: "auto", mt: "auto" }}>
                                                <Typography variant="h7" color="black">
                                                    ₹{product.price}
                                                </Typography>



                                            </Box>

                                            <Box sx={{ mt: "auto" }}>
                                                <Grid container spacing={0.5}>
                                                    <Grid size={{ xs: 6 }}>
                                                        {(cartSize?.some((item) => item.id === product.id)) ? <Button fullWidth variant="contained" onClick={() => {openCart() }}>Go To Cart</Button> :
                                                            <Button fullWidth variant="contained" onClick={() => addToCart(product.id)}>Add To Cart</Button>}
                                                    </Grid>
                                                    <Grid size={{ xs: 6 }}>
                                                        <Button fullWidth variant="contained" onClick={() => next(product.id)}>Buy</Button>

                                                    </Grid>
                                                </Grid>

                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}

                        </Grid>
                    </Box>
                </Paper>
            </Stack>
        </Box>
    )
}