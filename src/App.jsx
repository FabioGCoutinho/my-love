import { LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimateOnScroll from "./components/AnimateOnScroll";
import Countdown from "./components/Countdown";
import ImageCarousel from "./components/ImageCarousel";
import ImageModal from "./components/ImageModal";
import MultiItemCarousel from "./components/MultiItemCarousel";
import pageData from "./components/PageData";

// --- COMPONENTE PRINCIPAL DA APLICAÇÃO ---
export default function App() {
	const [generatedContent, setGeneratedContent] = useState({});
	const [loadingStates, setLoadingStates] = useState({});
	const [modalData, setModalData] = useState({
		images: null,
		currentIndex: null,
	});
	const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
	const finalSectionTriggerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsFinalSectionVisible(true);
				}
			},
			{ threshold: 0.8 }, // Ativa quando 80% do gatilho estiver visível
		);

		const currentRef = finalSectionTriggerRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	useEffect(() => {
		const mainContent = document.getElementById("main-content");
		if (isFinalSectionVisible) {
			mainContent.style.visibility = "hidden";
			mainContent.style.opacity = "0";
		} else {
			mainContent.style.visibility = "visible";
			mainContent.style.opacity = "1";
		}
	}, [isFinalSectionVisible]);

	// Funções do Modal
	const openModal = (images, index) =>
		setModalData({ images, currentIndex: index });
	const closeModal = () => setModalData({ images: null, currentIndex: null });
	const handleModalNext = () =>
		setModalData((prev) => ({
			...prev,
			currentIndex: (prev.currentIndex + 1) % prev.images.length,
		}));
	const handleModalPrev = () =>
		setModalData((prev) => ({
			...prev,
			currentIndex:
				(prev.currentIndex - 1 + prev.images.length) % prev.images.length,
		}));

	// Função para chamar a API do Gemini
	const callGeminiAPI = async (prompt) => {
		const apiKey = import.meta.env.VITE_GEMINI_KEY; // Deixe em branco, será tratado pelo ambiente
		const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
		const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok) throw new Error(`API error: ${response.statusText}`);
			const result = await response.json();
			if (result.candidates[0]?.content?.parts[0]?.text) {
				return result.candidates[0].content.parts[0].text;
			} else {
				throw new Error("Resposta da API inválida.");
			}
		} catch (error) {
			console.error("Erro ao chamar a API do Gemini:", error);
			return "Desculpe, não foi possível gerar o texto neste momento. Tente novamente mais tarde.";
		}
	};

	const handleGenerateMemory = async (evento) => {
		setLoadingStates((prev) => ({ ...prev, [evento.id]: true }));
		setGeneratedContent((prev) => ({ ...prev, [evento.id]: null }));
		const prompt = `Você é um poeta sensível. Escreva uma curta lembrança poética e emotiva sobre o seguinte momento vivido por um casal: Título: '${evento.titulo}', Data: '${evento.data}', Descrição: '${evento.descricao}'. Foque nos sentimentos de amor, nostalgia e na importância do momento. Use uma linguagem tocante. O texto deve ter entre 1 e 2 parágrafos.`;
		const text = await callGeminiAPI(prompt);
		setGeneratedContent((prev) => ({ ...prev, [evento.id]: text }));
		setLoadingStates((prev) => ({ ...prev, [evento.id]: false }));
	};

	const handleGeneratePoem = async () => {
		setLoadingStates((prev) => ({ ...prev, finalPoem: true }));
		setGeneratedContent((prev) => ({ ...prev, finalPoem: null }));
		const prompt = `Você é um poeta. Escreva um poema de 4 estrofes sobre a jornada de um casal, cujo nome da mulher é ${pageData.nomeExEsposa}. A história deles começou com um namoro em ${pageData.eventos[0].data}, eles se casaram em ${pageData.eventos[1].data} e tiveram um filho em ${pageData.eventos[2].data}. Apesar de não estarem mais juntos, existe um grande carinho, respeito e um elo eterno através do filho. O tom deve ser de gratidão, nostalgia e afeto, celebrando o que foi vivido e o legado de amor que permanece.`;
		const text = await callGeminiAPI(prompt);
		setGeneratedContent((prev) => ({ ...prev, finalPoem: text }));
		setLoadingStates((prev) => ({ ...prev, finalPoem: false }));
	};

	const { separationEvent } = pageData;

	return (
		<>
			<div className="bg-gray-100 font-sans text-gray-800 overflow-x-hidden">
				<div id="main-content" className="transition-opacity duration-1000">
					<header className="relative h-screen flex items-center justify-center text-center text-white p-4">
						<div
							className="absolute h-screen inset-0 bg-cover bg-center z-0"
							style={{ backgroundImage: `url(${pageData.imagemFundo})` }}
							aria-hidden="true"
						></div>
						<div
							className="absolute inset-0 bg-black/50 z-10"
							aria-hidden="true"
						></div>
						<div className="relative z-20 animate-fade-in-down">
							<h1
								className="text-4xl md:text-6xl font-extrabold tracking-tight"
								style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
							>
								{pageData.titulo.replace("[Nome]", pageData.nomeExEsposa)}
							</h1>
							<p
								className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light"
								style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
							>
								{pageData.textoIntroducao}
							</p>
						</div>
					</header>

					<main className="py-16 md:py-24 bg-white">
						<div className="container mx-auto px-4">
							<div className="max-w-4xl mx-auto space-y-16">
								{pageData.timelineEvents.map((evento, index) => (
									<AnimateOnScroll
										key={evento.id}
										className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
									>
										<div
											className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-last" : ""}`}
										>
											<ImageCarousel
												images={evento.imagens}
												onImageClick={openModal}
											/>
										</div>
										<div className="w-full md:w-1/2">
											<h2 className={`text-3xl font-bold mb-2 text-pink-500`}>
												{evento.titulo}
											</h2>
											<p className="text-lg font-semibold text-gray-500 mb-4">
												{evento.data}
											</p>
											<p className="text-base leading-relaxed">
												{evento.descricao}
											</p>
											<button
												type="button"
												onClick={() => handleGenerateMemory(evento)}
												disabled={loadingStates[evento.id]}
												className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
											>
												{loadingStates[evento.id] ? (
													<LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5" />
												) : (
													<Sparkles className="mr-2 h-5 w-5" />
												)}
												{loadingStates[evento.id]
													? "Gerando..."
													: "Gerar lembrança poética"}
											</button>
											{generatedContent[evento.id] && (
												<div className="mt-6 p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
													<p className="text-gray-700 whitespace-pre-wrap font-serif italic">
														{generatedContent[evento.id]}
													</p>
												</div>
											)}
										</div>
									</AnimateOnScroll>
								))}
							</div>
						</div>
					</main>

					<MultiItemCarousel
						title={pageData.momentos.titulo}
						text={pageData.momentos.texto}
						images={pageData.momentos.imagens}
						onImageClick={openModal}
					/>

					<section className="bg-white py-16 md:py-24">
						<div className="container mx-auto px-4">
							<div className="max-w-4xl mx-auto space-y-16">
								{/* Seção da Separação */}
								<AnimateOnScroll
									key={separationEvent.id}
									className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
								>
									<div className="w-full md:w-1/2 md:order-last">
										<ImageCarousel
											images={separationEvent.imagens}
											onImageClick={openModal}
										/>
									</div>
									<div className="w-full md:w-1/2">
										<h2 className="text-3xl font-bold mb-2 text-gray-500">
											{separationEvent.titulo}
										</h2>
										<p className="text-lg font-semibold text-gray-500 mb-4">
											{separationEvent.data}
										</p>
										<p className="text-base leading-relaxed">
											{separationEvent.descricao}
										</p>
										{separationEvent.destaque && (
											<div className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-400 rounded-r-lg">
												<p className="text-gray-700 font-semibold italic">
													{separationEvent.destaque}
												</p>
											</div>
										)}
									</div>
								</AnimateOnScroll>

								{/* Seção do Poema Final */}
								<AnimateOnScroll className="text-center pt-16 border-t-2 border-gray-200 border-dashed">
									<h2 className="text-3xl font-bold text-gray-800 mb-4">
										Nossa Jornada em Versos
									</h2>
									<p className="max-w-2xl mx-auto text-gray-600 mb-8">
										O tempo passou, mas a beleza da nossa história merece ser
										eternizada. Clique no botão abaixo para criar um poema único
										sobre nosso caminho.
									</p>
									<button
										type="button"
										onClick={handleGeneratePoem}
										disabled={loadingStates.finalPoem}
										className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 disabled:bg-gray-500 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
									>
										{loadingStates.finalPoem ? (
											<LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5" />
										) : (
											<Sparkles className="mr-2 h-5 w-5" />
										)}
										{loadingStates.finalPoem
											? "Criando Poema..."
											: "Criar um poema sobre nossa jornada"}
									</button>
									{generatedContent.finalPoem && (
										<div className="mt-10 max-w-2xl mx-auto p-6 bg-gray-50 border-t-4 border-gray-800 rounded-b-lg shadow-lg">
											<p className="text-gray-700 whitespace-pre-wrap font-serif text-lg text-left">
												{generatedContent.finalPoem}
											</p>
										</div>
									)}
								</AnimateOnScroll>
							</div>
						</div>
					</section>

					<section className="w-screen h-screen bg-white py-16 md:py-24 flex justify-center">
						<div className="w-0.5 h-full">
							. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
						</div>
					</section>

					<div ref={finalSectionTriggerRef} style={{ height: "1px" }}></div>
					<footer className="bg-gray-900 text-white text-center p-6">
						<p>Feito com amor, para lembrar de tudo que foi bom.</p>
					</footer>
				</div>

				{/* Seção Final em Tela Cheia */}
				<div
					className={`fixed inset-0 z-40 transition-opacity duration-1000 ${isFinalSectionVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				>
					<section className="bg-gray-800 text-white w-full h-full flex items-center justify-center">
						<button
							type="button"
							onClick={() => setIsFinalSectionVisible(false)}
							className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg transition-transform transform hover:scale-110 z-50"
							aria-label="Fechar"
						>
							&times;
						</button>
						<div
							className={`transition-all duration-1000 ease-out ${isFinalSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
						>
							<div className="container mx-auto px-4 text-center">
								<h2 className="text-2xl md:text-4xl font-bold mb-4">
									Uma Chama Que Não se Apaga
								</h2>
								<p className="max-w-3xl mx-auto text-gray-300 text-md md:text-xl mb-8">
									O tempo pode passar, e os relógios podem continuar a girar,
									mas eles não têm o poder de medir o que um coração sente. Meu
									amor por você não vive nos segundos que se foram, mas na
									eternidade de cada momento que compartilhamos. Ele continua
									aqui, intacto, e com ele a esperança de que um dia possamos
									olhar para trás e ver este tempo apenas como uma pausa em
									nossa história.
								</p>
								<h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">
									O tempo longe de você:
								</h3>
								<Countdown startDate="2024-08-04T00:00:00-03:00" />
								<p className="mt-8 text-gray-400 italic">
									Mas saiba que este contador pode parar. A qualquer momento.
									Ele só precisa de uma palavra sua para voltar ao zero.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>

			<ImageModal
				modalData={modalData}
				onClose={closeModal}
				onNext={handleModalNext}
				onPrev={handleModalPrev}
			/>

			<style>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
      `}</style>
		</>
	);
}
