import { useState } from "react";
import "../styles/ExerciseCard.css";

interface ExerciseCardProps {
	name: string;
	youtubeLink: string;
	description: string;
}

export default function ExerciseCard({name,youtubeLink,description}: ExerciseCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	
    const handleIframeClick = (event: React.MouseEvent<HTMLIFrameElement>) => {
        event.stopPropagation();
    };

	return (
		<div
			className={`exercise-card ${isFlipped ? "flipped" : ""}`}
			onClick={() => setIsFlipped(!isFlipped)}
		>
			{/* Delante */}
			<div className="exercise-card-front">
				<h3>{name}</h3>
				<iframe
					src={youtubeLink}
					width="100%"
					height="200"
					title={name}
                    onClick={handleIframeClick}
				></iframe>
			</div>
			{/* Detrás */}
			<div className="exercise-card-back">
				<h3>{name}</h3>
				<p dangerouslySetInnerHTML={{ __html: description }}></p>
			</div>
		</div>
	);
}
