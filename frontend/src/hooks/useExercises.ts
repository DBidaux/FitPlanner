import { useQuery } from "@tanstack/react-query";
import { fetchExercises, fetchMuscleGroups } from "../api/exercises";

export const useExercises = (page: number, muscleGroup?: number) => {
    return useQuery({
        queryKey: ["exercises", page, muscleGroup],
        queryFn: () => fetchExercises(page, muscleGroup),
        staleTime: 5000,
    });
};

export const useMuscleGroups = () => {
    return useQuery({
        queryKey:["muscleGroups"],
        queryFn: fetchMuscleGroups
    })
}