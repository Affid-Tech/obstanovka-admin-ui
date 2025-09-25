import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';


export function DashboardPage() {
    return (
        <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
            <Grid size={{ xs: 4, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1">Welcome</Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is your React 19 + Vite 7 + MUI v7 baseline. Replace this with real stats.
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={{ xs: 4, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1">Next steps</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Wire authentication to your OpenAPI spec and scaffold the first entity list.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}