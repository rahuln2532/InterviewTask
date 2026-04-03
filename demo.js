 
 
 // card
 <Box sx={{ display: "flex", justifyContent: "end", alignContent: "center", size: "sx", height: 40 }}>
                    {/* <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}> Product Listing </Typography> */}
                    <TextField type="text" placeholder="Serach"
                        onChange={(e) => setDemo({ ...demo, value: e.target.value })}
                        size="small"></TextField>

                   {user.roleValue=="admin"&&
                    <Button variant="contained" onClick={() => { setPrev(initial), navigate('/addProduct') }} sx={{ ml: 2, p: 2 }} size="small">Add Product</Button>
                    }
                    
                    <Tooltip title="Filter">
                        <Button variant="text" onClick={toggleDrawer(true)} sx={{ ml: 1 }} size="small"><TuneSharpIcon /></Button>
                    </Tooltip>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Filter by Price</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2} sx={{ pt: 1 }}>
                                <TextField
                                    label="Min Price"
                                    type="number"
                                    value={demo.min}
                                    onChange={(e) => setDemo({ ...demo, min: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Max Price"
                                    type="number"
                                    value={demo.max}
                                    onChange={(e) => setDemo({ ...demo, max: e.target.value })}
                                    fullWidth
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={removeFilter} variant="text">Remove Filter</Button>
                            <Button onClick={() => setOpen(false)} variant="contained">Close</Button>

                        </DialogActions>
                    </Dialog>
                </Box>



