/** biome-ignore-all lint/suspicious/noArrayIndexKey: <So tenho o index para user no Key do map> */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ImageCarousel = ({ images, onImageClick }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () =>
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	const goToNext = () =>
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);

	if (!images || images.length === 0)
		return <div>Sem imagens para exibir.</div>;

	return (
		<div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
			<div
				style={{ backgroundImage: `url(${images[currentIndex]})` }}
				className="w-full h-full bg-center bg-cover transition-all duration-500 ease-in-out transform group-hover:scale-105 cursor-pointer"
			></div>
			<div
				role="dialog"
				className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40"
				onClick={() => onImageClick(images, currentIndex)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			></div>
			<button
				type="button"
				onClick={goToPrevious}
				className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
				aria-label="Imagem Anterior"
			>
				<ChevronLeft className="h-6 w-6" />
			</button>
			<button
				type="button"
				onClick={goToNext}
				className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
				aria-label="Próxima Imagem"
			>
				<ChevronRight className="h-6 w-6" />
			</button>
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((_, index) => (
					<div
						key={index}
						role="dialog"
						className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
						onClick={() => setCurrentIndex(index)}
						onKeyDown={(e) => {
							if (e.key === index.toString() || e.key === " ") {
								e.stopPropagation();
								setCurrentIndex(index);
							}
						}}
					></div>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;
