import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createEquipment, deleteEquipment, getEquipment, listEquipment, patchEquipment } from '@/api/equipment';


export function useEquipmentList(q: string, page = 0, size = 10, sort?: string) {
    return useQuery({
        queryKey: ['equipment', { q, page, size, sort }],
        queryFn: () => listEquipment({ q, page, size, sort }),
    });
}


export function useEquipment(id: string | undefined) {
    return useQuery({
        queryKey: ['equipment', id],
        queryFn: () => getEquipment(id!),
        enabled: !!id,
    });
}


export function useCreateEquipment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createEquipment,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['equipment'] }),
    });
}


export function useUpdateEquipment(id: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => patchEquipment(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['equipment', id] });
            qc.invalidateQueries({ queryKey: ['equipment'] });
        },
    });
}


export function useDeleteEquipment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteEquipment,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['equipment'] }),
    });
}