import * as yup from 'yup';

export const validationSchema = yup.object({
    username: yup.string().required(),
    normalizedUserName: yup.string().required(),
    email: yup.string().required(),
    normalizedEmail: yup.string().required(),
})