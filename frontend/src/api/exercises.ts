import axios from "axios";

//URL BASE de api wger
const API_URL = "https://wger.de/api/v2"

//Obtener ejercicios
export const fetchExercises = async (page:number, muscleGroup?: number) => {
    const limit = 20;
    const offset = (page - 1) *limit;

    //Parámetros musculares
    const categoryParam = muscleGroup ? `&category=${muscleGroup}` :"";

    //Request
    const exerciseResponse = await axios.get(`${API_URL}/exercise/?language=2&limit=${limit}&offset=${offset}${categoryParam}`);
    const exercises = exerciseResponse.data.results
    
    //URL de la peticion
    // console.log(exerciseResponse.config.url)


    return{
        exercises,
        totalCount: exerciseResponse.data.count,
    }
}

//Listar grupos musculares
export const fetchMuscleGroups = async()=>{
    const response = await axios.get(`${API_URL}/exercisecategory/`);
    return response.data.results;
}

const YOUTUBE_API_KEY = "AIzaSyAqEXv66pr6683m7ZfslxEE575Snh0UHYA";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

export const fetchYouTubeVideoId = async (query: string): Promise<string | null> => {
    try {
        const response = await axios.get(YOUTUBE_API_URL, {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 1,
                key: YOUTUBE_API_KEY,
            },
        });

        const items = response.data.items;
        if (items && items.length > 0) {
            return items[0].id.videoId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching YouTube video ID:", error);
        return null;
    }
};