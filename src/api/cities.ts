import {axiosInstance} from "@/lib/axios";
import {type CityCreate, type CityRead, type PageCityRead, PageCityReadSchema } from "@/features/cities/types";

export async function listCities(params: { page?: number; size?: number; sort?: string }): Promise<PageCityRead> {
    const { data } = await axiosInstance.get("/api/v1/cities", { params });
    const parsed = PageCityReadSchema.safeParse(data);
    if (!parsed.success) {
        // eslint-disable-next-line no-console
        console.error(parsed.error);
        throw new Error("Invalid cities payload");
    }
    return parsed.data;
}

export async function createCity(payload: CityCreate): Promise<CityRead> {
    const { data } = await axiosInstance.post("/api/v1/cities", payload);
    return data;
}

export async function deleteCity(id: string): Promise<void> {
    await axiosInstance.delete(`/api/v1/cities/${encodeURIComponent(id)}`);
}
