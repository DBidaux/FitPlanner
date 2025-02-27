import { useExercises, useMuscleGroups } from "../hooks/useExercises";
import { Exercise, Group } from "../types/exercise";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function Exercises() {
	const [page, setPage] = useState(1);
	const [selectedMuscle, setSelectedMuscle] = useState<number | undefined>(
		undefined
	);
	const { data, isLoading, error } = useExercises(page, selectedMuscle);
	const { data: muscleGroups } = useMuscleGroups();

	if (isLoading) return <p>Cargando ejercicios...</p>;
	if (error) return <p>Ocurrió un error al cargar los ejercicios</p>;
	if (!data) return <p>No se encontraron datos.</p>;

	const totalPages = Math.ceil(data.totalCount / 20);

	// Manejar cambio de grupo muscular y reiniciar la paginación
	const handleMuscleChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const muscleId = event.target.value
			? Number(event.target.value)
			: undefined;
		setSelectedMuscle(muscleId);
		setPage(1); // Reiniciar la paginación al cambiar el filtro
	};

	return (
		<div>
			<h1>Ejercicios disponibles</h1>

			{/* Selector grupo muscular */}
			<label>Filtrar por grupo muscular:</label>
			<select value={selectedMuscle || ""} onChange={handleMuscleChange}>
				<option value="">Todos</option>
				{muscleGroups?.map((group: Group) => (
					<option key={group.id} value={group.id}>
						{group.name}
					</option>
				))}
			</select>

			<ul>
				{data.exercises.map((exercise: Exercise) => {
					const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
						exercise.name
					)}+explain+gym+exercise`;

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
							<p
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										exercise.description
									),
								}}
							></p>
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
