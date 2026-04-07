import { Box, Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import bcrypt from "bcryptjs-react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RHFtextfield from "../component/rhfTextField";
import RHFUploadInput from "../component/rhfUploadInput";
import { AuthContext } from "../context/auth/authContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser, getUser } from "../api/userServices";
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
        email: yup.string().email("Invalid email").required("Email is required"),
        phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
        address: yup.string().required("Address is required"),
        image: yup.mixed().required("Document is required"),
        password: yup.string().matches( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/, "Password must be 6–12 digits and contain alphabet,numbers").required("Password is required"),
    });

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

    const { control, handleSubmit, watch ,formState:{isSubmitting} } = method;

    const values = watch();
    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await getUser('/user');
            const match = res.data.some((item) => item.email === data.email);
            console.log(match);
            if (match) {
                throw ('An account with this email already exists.')
            }

            // const salt=await bcrypt.genSalt(10);
            // const hash= await bcrypt.hash(data.password,salt);
            // console.log("hash",hash);

            const updatedData = { ...data, isActive: false }
            await createUser("/user", updatedData);
            enqueueSnackbar('User Created', {
                variant: 'success'
            });
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
            enqueueSnackbar(error, {
                variant: 'error'
            });
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
                                    <RHFtextfield name="phone" label="Phone" control={control} type={"number"} fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFtextfield name="password" label="Password" control={control} type={"password"} fullWidth />
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
                                        <Stack spacing={2} textAlign="center" alignItems="center">
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
                            <Button fullWidth variant="contained" type="submit" loading={isSubmitting}>Submit</Button>
                        </Box>
                    </form>
                </Card>
            </Container>
        </>
    )
}