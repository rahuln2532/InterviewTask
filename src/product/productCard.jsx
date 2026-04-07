import {
  Box, Button, Card, CardContent, CardMedia, Dialog,
  DialogActions, DialogContent, DialogTitle, Grid,
  Paper, Stack, TextField, Tooltip, Typography
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { ProductContext } from "../context/productContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import { AuthContext } from "../context/auth/authContext";
import { getUser } from "../api/userServices";
import { getProducts } from "../api/productService";

export default function CardComponent() {

  // const { data } = useContext(ProductContext);
  const[data,setCurrentData]=useState([]);
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [cartSize, setCartsize] = useState();

  const [filteredData, setFilteredData] = useState([]);

  const [filter, setFilter] = useState({
    value: "",
    min: "",
    max: ""
  });

  const load=async()=>{
     const res =await getProducts('/products')
     setCurrentData(res.data);

  }

  const [debounceValue] = useDebounce(filter, 500);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const next = (id) => {
    const itemToAdd = data.find((item) => item.id === id);
    if (itemToAdd) {
      const updatedCart = [{ ...itemToAdd, qty: 1 }];
      localStorage.setItem('buy', JSON.stringify(updatedCart));
      navigate(`/checkout`,{replace:true});
    }
  };

  const addToCart = (id) => {
    const itemToAdd = data.find((item) => item.id === id);

    if (itemToAdd) {
      const prevData = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = prevData.find((item) => item.id === id);

      let updatedCart;

      if (existingItem) {
        updatedCart = prevData.map((item) =>
          item.id === id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...prevData, { ...itemToAdd, qty: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      setCartsize(updatedCart);
    }
  };

  const openCart = () => {
    navigate('/checkout',{replace:true});
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    setCartsize(cartData);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleApply = () => {

    let newItem = [...data];

    if (debounceValue.value && debounceValue.value !== "") {
      const search = debounceValue.value.trim().toLowerCase();
      const searchNumber = Number(search);

      newItem = newItem.filter((d) => {
        const finalPrice = Math.round(
          d.price * (1 - ((d.discount || 0) / 100))
        );

        return (
          d.name?.toLowerCase().includes(search) ||
          d.description?.toLowerCase().includes(search) ||
          (!isNaN(searchNumber) && finalPrice === searchNumber)
        );
      });
    }

    if (debounceValue.max !== "" || debounceValue.min !== "") {

      newItem = newItem.filter((d) => {
        const finalPrice = Math.round(
          d.price * (1 - ((d.discount || 0) / 100))
        );

        if (debounceValue.max !== "" && debounceValue.min !== "") {
          return finalPrice >= Number(debounceValue.min) &&
                 finalPrice <= Number(debounceValue.max);
        }

        else if (debounceValue.min !== "") {
          return finalPrice >= Number(debounceValue.min);
        }

        else if (debounceValue.max !== "") {
          return finalPrice <= Number(debounceValue.max);
        }

        return true;
      });
    }

    setFilteredData(newItem);
  };

  const removeFilter = () => {
    setFilteredData(data);
    setFilter({ value: "", min: "", max: "" });
    setOpen(false);
  };

  useEffect(() => {
    handleApply();
  }, [debounceValue, data]);


  useEffect(()=>{
    load();
  },[]);

  return (
    <Box>
      <Stack spacing={5}>
        <Paper>
          <Box pb={10} pt={2} >

            <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>

              <TextField
                type="text"
                placeholder="Search"
                size="small"
                value={filter.value}
                onChange={(e) =>
                  setFilter({ ...filter, value: e.target.value })
                }
                sx={{ mr: 1 }}
              />

              <Tooltip title="Filter">
                <Button onClick={() => setOpen(true)}>
                  <TuneSharpIcon />
                </Button>
              </Tooltip>

              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Filter by Price</DialogTitle>

                <DialogContent>
                  <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField
                      label="Min Price"
                      type="number"
                      value={filter.min}
                      onChange={(e) =>
                        setFilter({ ...filter, min: e.target.value })
                      }
                    />
                    <TextField
                      label="Max Price"
                      type="number"
                      value={filter.max}
                      onChange={(e) =>
                        setFilter({ ...filter, max: e.target.value })
                      }
                    />
                  </Stack>
                </DialogContent>

                <DialogActions>
                  <Button onClick={removeFilter}>Remove</Button>
                  <Button onClick={()=>{setOpen(false)}} variant="contained">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

          
            <Button variant="text" onClick={openCart}>
              <Box
                component="span"
                sx={{
                  position: "fixed",
                  right: 20,
                  top: "20%",
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

            <Grid container sx={{ m: "auto", justifyContent: "center" }} spacing={3}>

              
              {filteredData.length === 0 ? (

                <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
                  <Typography variant="h6" color="text.secondary">
                    No products found
                  </Typography>
                </Box>

              ) : (

               
                filteredData.map((product) => (
                  <Grid item xs={12} sm={3} md={4} lg={6} key={product.id}>

                    <Card sx={{
                      maxWidth: 300,
                      minWidth: 300,
                      maxHeight: 400,
                      minHeight: 400,
                      borderRadius: 3,
                      boxShadow: 4,
                      mx: "auto",
                      display: "flex",
                      flexDirection: "column"
                    }}>

                      <CardMedia
                        component="img"
                        height="200"
                        image={product.imageUrl}
                      />

                      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>

                        <Typography variant="h6" fontWeight="bold" noWrap>
                          {product.name}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {product.description}
                        </Typography>

                        <Box display="flex" justifyContent="space-between">
                          <Typography>₹{product.price}</Typography>
                          <Typography>Stock: {product.stock}</Typography>
                        </Box>

                        <Box sx={{ mt: "auto" }}>
                          {product.stock === 0 ? (
                            <Button fullWidth variant="contained" color="error" disabled>
                              Out of Stock
                            </Button>
                          ) : (
                            <Grid container spacing={1}>
                              <Grid size={{xs:6}}>
                                {(cartSize?.some((item) => item.id === product.id)) ?
                                  <Button fullWidth variant="contained"size="small" color="warning" onClick={openCart}>
                                    Go To Cart
                                  </Button>
                                  :
                                  <Button fullWidth size="small" variant="contained" onClick={() => addToCart(product.id)}>
                                    Add To Cart
                                  </Button>
                                }
                              </Grid>

                              <Grid size={{xs:6}}>
                                <Button fullWidth variant="contained"  size="small" onClick={() => next(product.id)}>
                                  Buy
                                </Button>
                              </Grid>
                            </Grid>
                          )}
                        </Box>

                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>

          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
