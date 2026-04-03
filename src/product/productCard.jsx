import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/productContext";

export default function CardComponent() {

    const {data,setData} = useContext(ProductContext);

    const navigate = useNavigate();

 const next=()=>{
    navigate(`/checkOut`);
 }

    
//   const products=[
//     {
//       "id": 1,
//       "name": "iPhone 14",
//       "description": "128GB, Midnight Black",
//       "price": 70000,
//       "discount": 10,
//       "imageUrl": "https://images.unsplash.com/photo-1664478546381-2f97e6a8b3d1"
//     },
//     {
//       "id": 2,
//       "name": "Samsung Galaxy S23",
//       "description": "8GB RAM, 256GB Storage",
//       "price": 65000,
//       "discount": 15,
//       "imageUrl": "https://images.unsplash.com/photo-1678911820864-e4b2a7b4c83b"
//     },
//     {
//       "id": 3,
//       "name": "HP Laptop",
//       "description": "Intel i5, 16GB RAM",
//       "price": 55000,
//       "discount": 20,
//       "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
//     },
//     {
//       "id": 4,
//       "name": "Boat Headphones",
//       "description": "Wireless Bluetooth Headset",
//       "price": 3000,
//       "discount": 5,
//       "imageUrl": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
//     },
//     {
//       "id": 5,
//       "name": "Apple Watch",
//       "description": "Series 8 Smart Watch",
//       "price": 45000,
//       "discount": 12,
//       "imageUrl": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
//     },
//     {
//       "id": 6,
//       "name": "Dell Monitor",
//       "description": "24 inch Full HD Display",
//       "price": 12000,
//       "discount": 18,
//       "imageUrl": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"
//     }
//   ]





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

                                        {product.discount > 0 && (
                                            <Chip
                                                label={`${product.discount}% OFF`}
                                                color="error"
                                                size="small"
                                                sx={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
                                            />
                                        )}


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
                                                    ₹{Math.round(product.price * (1 - (product.discount / 100)))}
                                                </Typography>

                                                {product.discount > 0 && (

                                                    <Typography
                                                        variant="body2"
                                                        sx={{ textDecoration: "line-through", color: "gray" }}>
                                                        ₹{product.price}
                                                    </Typography>
                                                )}

                                            </Box>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{ mt: "auto", borderRadius: 2 }}
                                                    onClick={next(product)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            {/* } */}

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