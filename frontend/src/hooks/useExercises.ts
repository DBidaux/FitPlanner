import { useQuery } from "@tanstack/react-query";
import { fetchExercises } from "../api/exercises";

export const useExercises = (page: number) => {
    return useQuery({
        queryKey: ["exercises", page],
        queryFn: () => fetchExercises(page),
        staleTime: 5000,
    });
};