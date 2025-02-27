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
    console.log(exerciseResponse.config.url)


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