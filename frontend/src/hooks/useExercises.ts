import { useQuery } from "@tanstack/react-query";
import { fetchExercises, fetchMuscleGroups, fetchYouTubeVideoId } from "../api/exercises";
import { Exercise } from "../types/exercise";
import { useState } from "react";

export const useExercises = (page: number, muscleGroup?: number) => {
    return useQuery({
        queryKey: ["exercises", page, muscleGroup],
        queryFn: () => fetchExercises(page, muscleGroup),
        staleTime: 5000,
    });
};

export const useMuscleGroups = () => {
    return useQuery({
        queryKey: ["muscleGroups"],
        queryFn: fetchMuscleGroups,
    });
};

const fetchVideoIds = async (exercises: Exercise[], cache: { [key: string]: string }) => {
    const videoIds: { [key: number]: string } = {};
    for (const exercise of exercises) {
        if (cache[exercise.name]) {
            videoIds[exercise.id] = cache[exercise.name];
        } else {
            const videoId = await fetchYouTubeVideoId(exercise.name + " gym");
            if (videoId) {
                videoIds[exercise.id] = videoId;
                cache[exercise.name] = videoId;
            }
        }
    }
    return videoIds;
};

export const useYouTubeVideos = (exercises: Exercise[] | undefined) => {
    const [cache] = useState<{ [key: string]: string }>({});
    return useQuery({
        queryKey: ["youtubeVideos", exercises],
        queryFn: () => fetchVideoIds(exercises || [], cache),
        enabled: !!exercises,
        staleTime: 24*60*60*1000,
       
    });
};