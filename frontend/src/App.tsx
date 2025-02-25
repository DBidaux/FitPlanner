import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Exercises from "./pages/Exercises.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/exercises" element={<Exercises />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
export default App;
