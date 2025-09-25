import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button, Link, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useEquipmentList } from './hooks';


export function EquipmentListPage() {
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1); // UI is 1-based; API is 0-based
    const size = 10;


    const { data, isLoading, isError, error } = useEquipmentList(q, page - 1, size);
    const totalPages = data?.totalPages ?? 0;


    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h5">Equipment</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
                            <Button component={RouterLink} to="/equipment/new">Create</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>


            <Grid size={12}>
                <Paper sx={{ p: 2 }}>
                    <TextField size="small" fullWidth label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
                </Paper>
            </Grid>


            {isLoading && (
                <Grid size={12}><Paper sx={{ p: 2 }}>Loading…</Paper></Grid>
            )}
            {isError && (
                <Grid size={12}><Paper sx={{ p: 2, color: 'error.main' }}>{String((error as any)?.message ?? 'Error')}</Paper></Grid>
            )}


            {!isLoading && !isError && (
                <Grid size={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.content?.length ? (
                                    data.content.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>
                                                <Link component={RouterLink} to={`/equipment/${row.id}`}>{row.name}</Link>
                                            </TableCell>
                                            <TableCell>{row.description ?? '—'}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}><Box sx={{ p: 2 }}>No equipment found</Box></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination page={page} onChange={(_, p) => setPage(p)} count={totalPages} shape="rounded" />
                        </Box>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
}