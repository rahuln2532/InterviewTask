import {Box, Card, Container, Table, TableBody,TableCell, TableContainer, TableHead,TableRow, Typography, Divider} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/authContext";
import { getOrders } from "../api/orderService";

export default function OrderHistoryPage() {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

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

      <Typography variant="h5" fontWeight={700} mb={4}>
        Order History
      </Typography>

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