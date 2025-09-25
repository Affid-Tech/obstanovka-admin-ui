import { axiosInstance } from '@/lib/axios';


export type UUID = string;


export interface EquipmentReadDto {
    id: UUID;
    name: string;
    cover?: string | null;
    description?: string | null;
}


export interface EquipmentCreateDto {
    name: string;
    cover?: string | null;
    description?: string | null;
}


export type EquipmentPatchDto = Partial<EquipmentCreateDto>;


export interface PageEquipmentReadDto {
    content: EquipmentReadDto[];
    number: number; // current page (0-based)
    size: number;
    totalElements: number;
    totalPages: number;
}


export async function listEquipment(params: { q?: string; page?: number; size?: number; sort?: string }) {
    const { data } = await axiosInstance.get<PageEquipmentReadDto>('/api/v1/equipment', { params });
    return data;
}


export async function getEquipment(id: UUID) {
    const { data } = await axiosInstance.get<EquipmentReadDto>(`/api/v1/equipment/${id}`);
    return data;
}


export async function createEquipment(payload: EquipmentCreateDto) {
    const { data } = await axiosInstance.post<EquipmentReadDto>('/api/v1/equipment', payload);
    return data;
}


export async function patchEquipment(id: UUID, payload: EquipmentPatchDto) {
    const { data } = await axiosInstance.patch<EquipmentReadDto>(`/api/v1/equipment/${id}`, payload);
    return data;
}


export async function deleteEquipment(id: UUID) {
    await axiosInstance.delete(`/api/v1/equipment/${id}`);
}