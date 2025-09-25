import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { equipmentCreateSchema, equipmentPatchSchema, type EquipmentCreateDto } from './types';
import { useCreateEquipment, useEquipment, useUpdateEquipment } from './hooks';


export function EquipmentFormPage({ mode }: Readonly<{ mode: 'create' | 'edit' }>) {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = mode === 'edit';


    const { data } = useEquipment(id);
    const schema = isEdit ? equipmentPatchSchema : equipmentCreateSchema;


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EquipmentCreateDto>({
        resolver: zodResolver(schema),
        values: isEdit && data ? { name: data.name, cover: data.cover ?? null, description: data.description ?? null } : undefined,
    });


    const create = useCreateEquipment();
    const update = useUpdateEquipment(id ?? '');


    const onSubmit = async (values: EquipmentCreateDto) => {
        if (isEdit && id) {
            await update.mutateAsync(values);
            navigate(`/equipment/${id}`);
        } else {
            const created = await create.mutateAsync(values);
            const newId = (created as any)?.id;
            navigate(`/equipment/${newId ?? ''}`);
        }
    };


    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{isEdit ? 'Edit equipment' : 'Create equipment'}</Typography>
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Cover (URL)" {...register('cover')} error={!!errors.cover} helperText={errors.cover?.message} />
                </Grid>
                <Grid size={12}>
                    <TextField fullWidth multiline minRows={3} label="Description" {...register('description')} error={!!errors.description} helperText={errors.description?.message} />
                </Grid>
                <Grid size={12}>
                    <Button type="submit" disabled={isSubmitting}>{isEdit ? 'Save' : 'Create'}</Button>
                    <Button sx={{ ml: 1 }} variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}