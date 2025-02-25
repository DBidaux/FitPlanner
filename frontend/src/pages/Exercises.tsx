import { useExercises } from "../hooks/useExercises";
import { Exercise } from "../types/exercise";
import { useState } from "react";

export default function Exercises() {
	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useExercises(page);
	console.log(data);

	if (isLoading) return <p>Cargando ejercicios...</p>;
	if (error) return <p>Ocurrió un error al cargar los ejercicios</p>;
	if (!data) return <p>No se encontraron datos.</p>

	const totalPages = Math.ceil(data.totalCount / 20);

	return (
		<div>
			<h1>Ejercicios disponibles</h1>
			<ul>
				{data.exercises.map((exercise:Exercise) => {
					const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
						exercise.name
					)}+explain+exercise`;

					return (
						<li key={exercise.id} style={{ marginBottom: "20px" }}>
							<h3>{exercise.name}</h3>
							<a
								href={youtubeLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								🔗 Ver en YouTube
							</a>
							<p>{exercise.description}</p>
						</li>
					);
				})}
			</ul>

			{/* Paginación */}
			<div style={{ marginTop: "20px" }}>
				<button disabled={page === 1} onClick={() => setPage(page - 1)}>
					⬅️ Anterior
				</button>
				<span style={{ margin: "0 10px" }}>
					Página {page} de {totalPages}
				</span>
				<button
					disabled={page === totalPages}
					onClick={() => setPage(page + 1)}
				>
					Siguiente ➡️
				</button>
			</div>
		</div>
	);
}
