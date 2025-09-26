import { z } from "zod";

export const CityReadSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});
export type CityRead = z.infer<typeof CityReadSchema>;

export const CityCreateSchema = z.object({
    name: z.string().min(1, "Name is required").max(200),
});
export type CityCreate = z.infer<typeof CityCreateSchema>;

export const PageCityReadSchema = z.object({
    content: z.array(CityReadSchema),
    number: z.number(), // current page (0-based)
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
});
export type PageCityRead = z.infer<typeof PageCityReadSchema>;

export type CitiesQuery = {
    page?: number;
    size?: number;
    sort?: string; // e.g. "name,asc"
};
