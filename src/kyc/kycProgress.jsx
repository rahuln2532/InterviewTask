import { Box, Button, Card, Container, Icon, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function KYCunderReview() {

    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">

            <Card sx={{ p: 5, mt: 15, textAlign: "center" }}>

                <Icon icon="lets-icons:done-ring-round" color="success" sx={{ fontSize: 70 }} />

                <Typography variant="h4" fontWeight={600} mt={2} gutterBottom> KYC Under Review</Typography>

                <Typography color="text.secondary" mb={3}>
                    Wait For SomeTime ,Admin Still Proccessing Your KYC
                </Typography>
                <Box>

                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/productCard",{replace:true})}>Explore More</Button>

                   

                </Box>

            </Card>

        </Container>
    );
}