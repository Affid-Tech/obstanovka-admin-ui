import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';


const schema = z.object({username: z.string().min(1), password: z.string().min(1)});


type FormData = z.infer<typeof schema>;


export function SignInPage() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({resolver: zodResolver(schema)});

    const onSubmit = async (_values: FormData) => {
// TODO: Replace with real login via OpenAPI client when wired
        localStorage.setItem('token', 'demo');
        window.location.href = '/';
    };

    return (
        <Box sx={{display: 'grid', placeItems: 'center', minHeight: '100dvh', p: 2}}>
            <Paper sx={{p: 4, width: 420, maxWidth: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>Sign in</Typography>
                <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid size={12}>
                        <TextField fullWidth label="Username" {...register('username')} error={!!errors.username} helperText={errors.username?.message}/>
                    </Grid>
                    <Grid size={12}>
                        <TextField fullWidth type="password" label="Password" {...register('password')} error={!!errors.password} helperText={errors.password?.message}/>
                    </Grid>
                    <Grid size={12}>
                        <Button type="submit" disabled={isSubmitting} fullWidth>Sign in</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}