import { Box, Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs-react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RHFtextfield from "../component/rhfTextField";
import RHFUploadInput from "../component/rhfUploadInput";
import { AuthContext } from "../context/auth/authContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/userServices";
import { ProductContext } from "../context/productContext";

export function KycRegistration() {

    const { user, setUser, } = useContext(AuthContext);
    const { imageprev } = useContext(ProductContext);
    const navigate = useNavigate();


    const location = useLocation();
    const from = location.state?.from;

    const userSchema = yup.object().shape({
        firstname: yup.string().required("First name is required"),
        lastname: yup.string().required("Last name is required"),
        email: yup.string().email().required("email is required"),
        phone: yup.string().required("phone no is required"),
        address: yup.string().required("Address is required"),
        image: yup.mixed().required("Document is required"),
        password: yup.string().required("password is required"),
    })

    const defaultValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        image: '',
        address: ''
    }

    const method = useForm({
        resolver: yupResolver(userSchema,
            defaultValues)
    });

    const { control, handleSubmit, watch } = method;

    const values = watch();
    const onSubmit = handleSubmit(async (data) => {
        try {

            // const salt=await bcrypt.genSalt(10);
            // const hash= await bcrypt.hash(data.password,salt);
            // console.log("hash",hash);

            const updatedData = { ...data, isActive: false }
            await createUser("/user", updatedData);
            localStorage.setItem("user", JSON.stringify(updatedData.email));
            setUser(updatedData);
            // console.log("user", user)
            if (from === "checkout") {
                navigate("/checkout", { replace: true });
            } else if (from === "login") {
                navigate("/", { replace: true });
            } else {
                navigate("/productCard", { replace: true });
            }

        } catch (error) {
            console.error(error);
        }
    })
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Card>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h4" fontWeight={700} textAlign="center" p={2}>Sign In</Typography>
                        <Box sx={{ p: 5, pt: 0 }}>
                            <Grid container spacing={2}>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFtextfield name="firstname" label="First Name" control={control} fullWidth />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFtextfield name="lastname" label="Last Name" control={control} fullWidth />
                                </Grid>

                                <Grid size={{ xs: 12, md: 12 }}>
                                    <RHFtextfield name="email" label="Email" control={control} fullWidth />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFtextfield name="phone" label="Phone" control={control} fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFtextfield name="password" label="Password" control={control} fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <RHFtextfield name="address" label="Address" control={control} fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <Box sx={{
                                        p: 4,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "1px dashed grey",

                                    }}>
                                        <Stack spacing={2}textAlign="center" alignItems="center">
                                            {values.image &&
                                                <Box component="img" src={values?.image} height={150} width={120} />
                                            }
                                            <Typography >Upload Address Proof (Aadhar Card, Pan Card, Voter Id) Allowed Size less than 10 kb</Typography>

                                            <Button variant="contained" component="label">
                                                Upload File
                                                <RHFUploadInput name={"image"} control={control} type={"file"} accept={"image/*"} />
                                            </Button>
                                        </Stack>
                                    </Box>

                                </Grid>


                            </Grid>
                        </Box>
                        <Box sx={{ p: 5, pt: 0 }}>
                            <Button fullWidth variant="contained" type="submit" >Submit</Button>
                        </Box>
                    </form>
                </Card>
            </Container>
        </>
    )
}