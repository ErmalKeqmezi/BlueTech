import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Product } from "../../app/models/product";
import { useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzone from "../../app/components/AppDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
    user?: Users;
    cancelEdit: () => void;
}

export interface Users {
    id: number;
    username: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    password?: string
}


export default function AccountForm({ user, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting } } = useForm({
        resolver: yupResolver<any>(validationSchema)
    });

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Users;
            if (user) {
                response = await agent.Admin.updateUser(data)
            } else {
                response = await agent.Admin.createUser(data)
            }
            cancelEdit();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (user && !isDirty) reset(user)
    }, [user, reset, isDirty])
    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                User Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='username' label='Username' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} disabled name='normalizedUserName' label='NormalizedUsername' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='email' label='email' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='email' control={control} disabled name='normalizedEmail' label='NormalizedEmail'  />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='password' control={control} name='password' label='Password'  />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button variant='contained' color='inherit' onClick={cancelEdit}>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}