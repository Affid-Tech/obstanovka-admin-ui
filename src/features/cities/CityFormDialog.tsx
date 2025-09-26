import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid"; // v7 API, use `size`
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CityCreate, CityCreateSchema} from "./types";
import {useCreateCity} from "./hooks";

type Props = { open: boolean; onClose: () => void };

export default function CityFormDialog({ open, onClose }: Props) {
    const { mutateAsync, isPending } = useCreateCity();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<CityCreate>({ resolver: zodResolver(CityCreateSchema), defaultValues: { name: "" } });

    const onSubmit = async (data: CityCreate) => {
        try {
            await mutateAsync(data);
            reset();
            onClose();
        } catch (e: any) {
            const message = e?.response?.status === 409 ? "City with this name already exists" : (e?.message ?? "Failed");
            setError("name", { message });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create City</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                disabled={isPending}
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={1} sx={{ p: 1 }}>
                        <Button onClick={onClose} disabled={isPending} variant="outlined">Cancel</Button>
                        <Button type="submit" disabled={isPending} variant="contained">
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    );
}
