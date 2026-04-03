import { Box, Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RHFtextfield from "../component/rhfTextField";
import RHFUploadInput from "../component/rhfUploadInput";

export function KycRegistration() {
    const userSchema = yup.object().shape({
        firstname: yup.string().required("First name is required"),
        lastname: yup.string().required("Last name is required"),
        email: yup.string().email().required("email is required"),
        phone: yup.string().required("phone no is required"),
        address: yup.string().required("Address is required"),
        image: yup.mixed().required("Document is required"),
    })

    const defaultValues = {
        name: '',
        email: '',
        phone: ''
    }

    const method = useForm({
        resolver: yupResolver(userSchema,
            defaultValues)
    });

    const { control, handleSubmit } = method;


    const onSubmit= handleSubmit((data)=>{
       console.log(data);
    })
    return (
        <>
            <Container maxWidth="md" sx={{mt:10}}>
                <Card>
                    <form onSubmit={onSubmit}>
                    <Box sx={{ p: 5 }}>
                        <Grid container spacing={2}>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <RHFtextfield name="firstname" label="First Name" control={control} fullWidth />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <RHFtextfield name="lastname" label="Last Name" control={control} fullWidth />
                            </Grid>

                            <Grid size={{ xs: 12, md: 8 }}>
                                <RHFtextfield name="email" label="Email" control={control} fullWidth />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <RHFtextfield name="phone" label="Phone" control={control} fullWidth />
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
                                    <Stack spacing={2}>
                                        <Typography >Upload Address Proof (Aadhar Card, Pan Card, Voter Id)</Typography>

                                        <Button variant="contained" component="label">
                                            Upload File
                                            <RHFUploadInput name={"image"} control={control} type={"file"} accept={"image/*"} />
                                        </Button>
                                    </Stack>
                                </Box>

                            </Grid>


                        </Grid>
                    </Box>
                    <Box sx={{p:5 ,pt:0}}>
                    <Button fullWidth variant="contained" type="submit" >Submit</Button>
                    </Box>
                    </form>
                </Card>
            </Container>
        </>
    )
}