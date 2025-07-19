/** biome-ignore-all lint/correctness/useHookAtTopLevel: <Nao afeta em nada a funcao> */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const ImageModal = ({ modalData, onClose, onNext, onPrev }) => {
	if (!modalData.images || modalData.currentIndex === null) return null;

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowRight") onNext();
			if (event.key === "ArrowLeft") onPrev();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, onNext, onPrev]);

	const imageUrl = modalData.images[modalData.currentIndex];

	return (
		<div
			role="dialog"
			className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in"
			aria-label="Fechar modal"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape" || e.key === " ") {
					onClose();
				}
			}}
		>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onPrev();
				}}
				className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
				aria-label="Imagem anterior"
			>
				<ChevronLeft className="h-8 w-8" />
			</button>
			<div
				role="dialog"
				className="relative max-w-5xl max-h-full"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			>
				<img
					key={imageUrl}
					src={imageUrl.replace(/w=\d+/, "w=1200")}
					alt="Lembrança de Layla Ketna - Visualização ampliada"
					className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-fade-in"
				/>
			</div>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onNext();
				}}
				className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
				aria-label="Próxima imagem"
			>
				<ChevronRight className="h-8 w-8" />
			</button>
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg transition-transform transform hover:scale-110"
				aria-label="Fechar"
			>
				&times;
			</button>
		</div>
	);
};

export default ImageModal;
