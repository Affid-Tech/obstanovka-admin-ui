import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {CitiesQuery, CityCreate, PageCityRead} from "./types";
import { createCity, deleteCity, listCities } from "@/api/cities";

export const citiesKeys = {
    all: ["cities"] as const,
    list: (q: CitiesQuery) => ["cities", { page: q.page ?? 0, size: q.size ?? 20, sort: q.sort }] as const,
};

export function useCities(q: CitiesQuery) {
    return useQuery<PageCityRead>({
        queryKey: citiesKeys.list(q),
        queryFn: () => listCities(q)
    });
}

export function useCreateCity() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CityCreate) => createCity(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: citiesKeys.all }),
    });
}

export function useDeleteCity() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteCity(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: citiesKeys.all }),
    });
}
