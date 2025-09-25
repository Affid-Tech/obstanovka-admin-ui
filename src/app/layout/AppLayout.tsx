import { Outlet, NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AppBar, Box, Divider, List, ListItemButton, Toolbar, Typography } from '@mui/material';


export function AppLayout() {
    return (
        <Grid container columns={{ xs: 4, md: 12 }} sx={{ minHeight: '100dvh' }}>
            {/* Sidebar */}
            <Grid size={{ xs: 4, md: 3 }}>
                <Box component="aside" sx={{ height: '100%', borderRight: 1, borderColor: 'divider', p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Admin</Typography>
                    <Divider />
                    <List>
                        <ListItemButton component={NavLink} to="/dashboard">Dashboard</ListItemButton>
                    </List>
                </Box>
            </Grid>


            {/* Main */}
            <Grid size={{ xs: 4, md: 9 }}>
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Typography variant="h6">Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
}