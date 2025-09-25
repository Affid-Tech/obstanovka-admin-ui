import { z } from 'zod';


export const equipmentCreateSchema = z.object({
    name: z.string().min(1).max(200),
    cover: z.string().url().max(1000).nullable().optional().or(z.literal('').transform(() => null)),
    description: z.string().max(5000).nullable().optional(),
});


export const equipmentPatchSchema = equipmentCreateSchema.partial();


export type EquipmentCreateDto = z.infer<typeof equipmentCreateSchema>;
export type EquipmentPatchDto = z.infer<typeof equipmentPatchSchema>;