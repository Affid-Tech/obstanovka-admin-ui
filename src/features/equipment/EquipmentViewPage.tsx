import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useDeleteEquipment, useEquipment } from './hooks';


export function EquipmentViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useEquipment(id);
    const del = useDeleteEquipment();


    const onDelete = async () => {
        if (!id) return;
        if (confirm('Delete this equipment?')) {
            await del.mutateAsync(id);
            navigate('/equipment');
        }
    };


    if (isLoading) return <Paper sx={{ p: 2 }}>Loading…</Paper>;
    if (isError || !data) return <Paper sx={{ p: 2 }}>Not found</Paper>;


    return (
        <Grid container spacing={2}>

            <Grid size={12}>
                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h4">{data.name}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
                                <Button component={RouterLink} to={`/equipment/${id}/edit`} sx={{ mr: 1 }}>Edit</Button>
                                <Button color="error" variant="outlined" onClick={onDelete}>Delete</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid size={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>Description</Typography>
                    <Typography>{data.description ?? '—'}</Typography>
                </Paper>
            </Grid>

            <Grid size={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>Cover</Typography>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <img
                            src={data.cover}
                            alt="Equipment cover"
                            style={{
                                maxWidth: "100%",
                                borderRadius: 18,
                                boxShadow: "0 2px 12px #0C081522",
                                objectFit: "contain"
                            }}
                        />
                    </Box>
                </Paper>
            </Grid>

        </Grid>
    );
}