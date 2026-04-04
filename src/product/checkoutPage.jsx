import { Box, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Divider, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export default function CheckoutPage() {


  const navigate = useNavigate();
  const [orderData, setOrderdata] = useState([]);
  const { data, setData } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();


  const CardData = () => {
    const result = localStorage.getItem('buy');
    if (result) {
      const parsedata = JSON.parse(result);
      setOrderdata(parsedata);

    } else {

      const result2 = localStorage.getItem('cart');
      const parsedata = JSON.parse(result2);
      setOrderdata(parsedata);
    }

  }




  const increaseQty = (index) => {
    const updated = [...orderData];

    updated[index].qty += 1;

    setOrderdata(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...orderData];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;

    }

    setOrderdata(updated);
  };


  const actualPrice = orderData?.reduce((total, item) => total + item.price * item.qty, 0);

  const tax = 100;
  const delivery = 100;
  const total = actualPrice + tax + delivery;

  const handelCheckout = () => {

    // const user = localStorage.getItem("user");
    // const userData = JSON.parse(user);
    console.log("user", user);

    if (user === null || user === undefined) {
      navigate("/kyc");
      return;
    }
    else if (!user.isActive) {
      navigate("/underReview");
      return;
    }
    else {
      const result = localStorage.getItem('buy');
      if (result) {
        localStorage.removeItem('buy');
      } else {
        localStorage.removeItem('cart');
      }

      navigate("/orderDone");
    }


  }

  useEffect(() => {

    CardData();

  }, [data, id]);

  return (

    <Container sx={{ mt: 4 }}>
      <Box mb={5}>
        <Typography variant="h4" fontWeight={700}>checkout</Typography>
      </Box>


      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Shopping Cart</Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell align="right"><b>Price</b></TableCell>
                    <TableCell align="center"><b>Qty</b></TableCell>
                    <TableCell align="right"><b>Total</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData?.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell><Typography fontWeight={500}>{item.name}</Typography></TableCell>
                      <TableCell align="right">₹{item.price}</TableCell>
                      <TableCell align="right">
                        <Box display="flex " justifyContent="center" alignItems="center" gap={1}>
                          <Button variant="text" onClick={() => decreaseQty(index)}> -</Button>
                          <Typography variant="subtitle2">{item.qty} </Typography>
                          <Button variant="text" onClick={() => increaseQty(index)}> +</Button>
                        </Box>
                      </TableCell>
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

            <Button fullWidth variant="contained" size="large" sx={{ borderRadius: 2 }} onClick={handelCheckout}> Order</Button>

          </Card>
        </Grid>

      </Grid>

    </Container>
  );
}