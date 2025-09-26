import * as React from "react";
import {
    Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Toolbar, Typography, Pagination, Tooltip, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import Grid from "@mui/material/Grid"; // v7 API, use `size`
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCities, useDeleteCity } from "./hooks";
import CityFormDialog from "./CityFormDialog";

const DEFAULT_SIZE = 20;

export default function CitiesListPage() {
    const [page, setPage] = React.useState(0);
    const [size] = React.useState(DEFAULT_SIZE);
    const [sort] = React.useState<string | undefined>(undefined);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [confirmId, setConfirmId] = React.useState<string | null>(null);

    const { data, isLoading, isError, error, isFetching } = useCities({ page, size, sort });
    const { mutateAsync: doDelete, isPending: deleting, error: delErr, reset: resetDelErr } = useDeleteCity();

    const totalPages = data?.totalPages ?? 0;

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await doDelete(confirmId);
            setConfirmId(null);
        } catch {
            /* surfaced via delErr */
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h5">Cities</Typography>
                        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenCreate(true)}>
                            New City
                        </Button>
                    </Toolbar>
                </Grid>

                <Grid size={12}>
                    {isLoading ? (
                        <Box sx={{ textAlign: "center", py: 6 }}>
                            <CircularProgress />
                            <Typography variant="body2" sx={{ mt: 1 }}>Loading cities…</Typography>
                        </Box>
                    ) : isError ? (
                        <Alert severity="error">{(error as Error)?.message ?? "Failed to load cities"}</Alert>
                    ) : (data?.content?.length ?? 0) === 0 ? (
                        <Paper sx={{ p: 3, textAlign: "center" }}>
                            <Typography sx={{ mb: 2 }}>No cities yet.</Typography>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCreate(true)}>
                                Create your first city
                            </Button>
                        </Paper>
                    ) : (
                        <>
                            {isFetching && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                    <CircularProgress size={16} /> <Typography variant="caption">Refreshing…</Typography>
                                </Box>
                            )}
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width="60%">Name</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data!.content.map((c) => (
                                            <TableRow key={c.id} hover>
                                                <TableCell>{c.name}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Delete">
                            <span>
                              <IconButton
                                  size="small"
                                  onClick={() => {
                                      resetDelErr();
                                      setConfirmId(c.id);
                                  }}
                                  disabled={deleting}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </span>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <Pagination
                                    page={page + 1}
                                    count={totalPages}
                                    onChange={(_, p) => setPage(p - 1)}
                                    showFirstButton
                                    showLastButton
                                    color="primary"
                                />
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>

            <CityFormDialog open={openCreate} onClose={() => setOpenCreate(false)} />

            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
                <DialogTitle>Delete city?</DialogTitle>
                <DialogContent>
                    {delErr ? <Alert severity="error">{(delErr as Error).message}</Alert> : <Typography>Are you sure?</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)} disabled={deleting} variant="outlined">Cancel</Button>
                    <Button onClick={handleDelete} disabled={deleting} color="error" variant="contained">
                        {deleting ? "Deleting…" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
