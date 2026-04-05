import { Box, Button, Card, Container, Icon, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderDonePage() {

  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">

      <Card sx={{ p: 5, mt: 10, textAlign: "center" }}>

        <Icon icon="lets-icons:done-ring-round" color="success" sx={{ fontSize: 70 }} />

        <Typography variant="h4" fontWeight={600} mt={2} gutterBottom> Order Placed Successfully </Typography>

        <Typography color="text.secondary" mb={3}>
          Thank you for your purchase.
          Your order has been confirmed.
        </Typography>

        <Box>

          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/productCard",{replace:true})}>Continue Shopping</Button>

          <Button variant="outlined" onClick={() => navigate("/orderHistory",{replace:true})}> View Orders</Button>

        </Box>

      </Card>

    </Container>
  );
}