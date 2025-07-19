/** biome-ignore-all lint/suspicious/noArrayIndexKey: <So tenho o index para user no Key do map> */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const MultiItemCarousel = ({ title, text, images, onImageClick }) => {
	const scrollContainerRef = useRef(null);

	const handleScroll = (direction) => {
		const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
		if (direction === "left") {
			scrollContainerRef.current.scrollBy({
				left: -scrollAmount,
				behavior: "smooth",
			});
		} else {
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="w-full min-h-screen bg-gray-800 py-16 md:py-24 overflow-hidden">
			<AnimateOnScroll className="container mx-auto px-4 text-center mb-12">
				<h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
				<p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
					{text}
				</p>
			</AnimateOnScroll>
			<AnimateOnScroll className="relative w-full">
				<button
					type="button"
					onClick={() => handleScroll("left")}
					className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
					aria-label="Retroceder"
				>
					<ChevronLeft className="w-8 h-8" />
				</button>
				<div
					ref={scrollContainerRef}
					className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-8"
				>
					{images.map((image, index) => (
						<div
							key={index}
							className="flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] mx-2 snap-center"
						>
							<div
								role="dialog"
								className="h-96 w-full rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
								onClick={() => onImageClick(images, index)}
								onKeyDown={(e) => {
									if (e.key === "ArrowUp" || e.key === " ") {
										onImageClick(images, index);
									}
								}}
							>
								<img
									src={image}
									className="h-full w-full object-cover"
									alt={`Lembrança de Layla Ketna - Momento ${index + 1}`}
								/>
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => handleScroll("right")}
					className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
					aria-label="Avançar"
				>
					<ChevronRight className="w-8 h-8" />
				</button>
			</AnimateOnScroll>
		</div>
	);
};

export default MultiItemCarousel;
