import {Box, Card, Container, Table, TableBody,TableCell, TableContainer, TableHead,TableRow, Typography, Divider, Button} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/authContext";
import { getOrders } from "../api/orderService";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

export default function OrderHistoryPage() {

  const { user } = useContext(AuthContext);
   const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const backNavigation=()=>{
     navigate('/productCard',{replace:true});
  }


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders('/orders');

        const userOrders = res.data.filter(
          (order) => order.userId === user?.id
        );

        setOrders(userOrders);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
       <Box mb={5} display="flex" justifyContent="flex-start">
        <Button variant="text"   onClick={backNavigation}><KeyboardBackspaceIcon/></Button>
      <Typography variant="h5" fontWeight={700} >Order History</Typography>

      </Box>

      {orders.length === 0 ? (
        <Typography color="text.secondary">
          No Orders Found
        </Typography>
      ) : (

        orders.map((order, i) => (

          <Card key={order.id} sx={{ p: 3, mb: 4, borderRadius: 3 }}>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontWeight={600}>
                Order {i + 1}
              </Typography>
              <Typography color="text.secondary">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>

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
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {item.name}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        ₹{item.price}
                      </TableCell>

                      <TableCell align="center">
                        {item.qty}
                      </TableCell>

                      <TableCell align="right">
                        ₹{item.price * item.qty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>

            <Box mt={3}>
              <Divider sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ₹ {order.total}
                </Typography>
              </Box>
            </Box>

          </Card>

        ))
      )}

    </Container>
  );
}