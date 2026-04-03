

import { Controller } from "react-hook-form";
import convertImage from "./imageConverter";
import { useContext } from "react";
// import { ProductContext } from "../context/productContext";
import { Typography } from "@mui/material";

export default function RHFUploadInput({ control, name, ...other }) {

    //   const {setImageprev}=useContext(ProductContext);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        hidden

                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const imageBase64 = await convertImage(file);
                            field.onChange(imageBase64);
                            // setImageprev(imageBase64);
                        }}
                        {...other}
                    />
                    {error && <Typography variant="body1" sx={{ color: 'red' }}>{error.message}</Typography>}
                </>
            )}
        />
    );
}
