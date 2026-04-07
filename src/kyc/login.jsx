import { Box, Button, Card, Container, Link, Snackbar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {enqueueSnackbar} from "notistack";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RHFtextfield from "../component/rhfTextField";
import { AuthContext } from "../context/auth/authContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";

export function KycLogin() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from;

    const userSchema = yup.object().shape({
        email: yup.string().email().required("email is required"),
        Password: yup.string().required("Password is required"),

    })

    const defaultValues = {
        email: '',
        Password: ''
    }

    const method = useForm({
        resolver: yupResolver(userSchema,
            defaultValues)
    });

    const { control, handleSubmit,formState:{isSubmitting} } = method;

    const guest = () => {
        navigate("/productCard");
    }


    const onSubmit = handleSubmit(async (data) => {
        try {
            const user = await login(data);
            enqueueSnackbar('login Successfully', {
                variant: 'success'
            });
            console.log(user);
            if (user.email) {
                if (from === "checkout") {
                    navigate("/checkout", { replace: true });
                } else {
                    navigate("/productCard", { replace: true });
                }
            }

        } catch (error) {
             enqueueSnackbar(error, {
                variant: 'error'
            });
        }
    })
    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 15 }}>
                <Card>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h4" fontWeight={700} textAlign="center" p={2}>Login</Typography>
                        <Box sx={{ p: 5, pt: 0 }}>
                            <RHFtextfield name="email" label="Email" control={control} fullWidth />
                            <RHFtextfield name="Password" label="Password" control={control} fullWidth />
                        </Box>
                        <Box sx={{ p: 5, pt: 0 }}>
                            <Button fullWidth variant="contained" type="submit" loading={isSubmitting} >Submit</Button>
                           
                                <Button fullWidth variant="text" onClick={guest} sx={{pt:2}}>Guest Login</Button>
                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", p: 2,pt:0 }}>
                                    <Typography variant="caption" alignItems="center">If you Don't have Account?</Typography>
                                <Link  sx={{textDecoration:false}} onClick={() => { navigate("/kyc", { state: { from: "login" } }); }} >sign up</Link>
                            </Box>
                        </Box>

                    </form>
                </Card>
            </Container>
        </>
    )
}