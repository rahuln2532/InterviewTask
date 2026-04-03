import { Box,Card,Container,Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Divider,Button} from "@mui/material";

export default function CheckoutPage() {

  const products = [
    { name: "Shirt", price: 500, qty: 2 },
    { name: "Pant", price: 800, qty: 1 }
  ];

  const actualPrice = products.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const tax = 100;
  const delivery = 100;
  const total = actualPrice + tax + delivery;

  return (
    
    <Container fullWidth sx={{ mt: 4 }}>
        <Box mb={5}>
          <Typography variant="h4" fontWeight={700}>checkout</Typography>
        </Box>
    

      <Grid container  spacing={3}>
        <Grid  size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Shopping Cart</Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell align="right"><b>Price</b></TableCell>
                    <TableCell align="right"><b>Qty</b></TableCell>
                    <TableCell align="right"><b>Total</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell><Typography fontWeight={500}>{item.name}</Typography></TableCell>
                      <TableCell align="right">₹{item.price}</TableCell>
                      <TableCell align="right">{item.qty}</TableCell>
                      <TableCell align="right">₹ {item.price * item.qty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>

          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>

            <Typography variant="h5" fontWeight="bold" mb={2}>Order Summary</Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Actual Price</Typography>
              <Typography>₹ {actualPrice}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Tax</Typography>
              <Typography>₹ {tax}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="text.secondary">Delivery Charges</Typography>
              <Typography>₹ {delivery}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">₹ {total}</Typography>
            </Box>

            <Button fullWidth variant="contained" size="large"sx={{ borderRadius: 2 }}> Proceed to Payment</Button>

          </Card>
        </Grid>

      </Grid>

    </Container> 
  );
}