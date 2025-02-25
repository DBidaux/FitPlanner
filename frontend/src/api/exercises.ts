import axios from "axios";

//URL BASE de api wger
const API_URL = "https://wger.de/api/v2"

//Obtener ejercicios
export const fetchExercises = async (page:number) => {
    const limit = 20;
    const offset = (page - 1) *limit;
    const exerciseResponse = await axios.get(`${API_URL}/exercise/?language=2&limit=${limit}&offset=${offset}`);

    const exercises = exerciseResponse.data.results
    return{
        exercises,
        totalCount: exerciseResponse.data.count,
    }
}
