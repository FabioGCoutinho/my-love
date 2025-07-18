import { useState, useEffect, useRef } from 'react';
import Backgroud from './assets/backgroud.jpg';
import { Sparkles, LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-react'

// --- DADOS DA PÁGINA ---
// Altere as informações aqui para personalizar a página.
// TROQUE AS URLS DAS IMAGENS PELAS SUAS FOTOS!
const pageData = {
  nomeExEsposa: "Layla Ketna",
  titulo: "Para você [Nome], com todo o meu coração",
  textoIntroducao: "Nossas vidas tomaram rumos diferentes, mas o carinho, o respeito e a história que construímos juntos jamais serão esquecidos. Esta é uma pequena homenagem a tudo que vivemos, aos momentos que nos moldaram e ao fruto mais lindo do nosso amor, nosso filho.",
  imagemFundo: Backgroud, // "https://plus.unsplash.com/premium_photo-1673796717297-0b0085f1cb39?q=80&w=1170&auto=format",
  timelineEvents: [
    {
      id: 'namoro',
      titulo: "O Início do Nosso Namoro",
      data: "25 de Janeiro de 2014",
      descricao: "4 anos após eu te ver pela primeira vez, neste dia, nosso relacionamento floresceu para algo mais. Foi o começo de uma nova e inesquecível fase em nossas vidas.",
      imagens: [
        "../fotos/namoro/20140704_151344.jpg",
        "../fotos/namoro/20140716_135142.jpg",
        "../fotos/namoro/20140726_130425.jpg",
        "../fotos/namoro/20150324_214046.jpg",
        "../fotos/namoro/20150324_214057.jpg",
        "../fotos/namoro/20150531_191623.jpg",
        "../fotos/namoro/20150902_201118.jpg",
      ]
    },
    {
      id: 'casamento',
      titulo: "O Dia do Nosso 'Sim'",
      data: "30 de Agosto de 2014",
      descricao: "Diante de nossos amigos e familiares, celebramos nossa união. Uma promessa de amor e companheirismo que guardo com carinho no coração.",
      imagens: [
        "../fotos/casamento/20140830_095713.jpg",
        "../fotos/casamento/20140830_115649.jpg",
        "../fotos/casamento/20140830_115851.jpg",
        "../fotos/casamento/20140830_115901.jpg",
        "../fotos/casamento/20140830_115907~2.jpg",
        "../fotos/casamento/20140830_120058.jpg",
        "../fotos/casamento/20140830_130105.jpg",
        "../fotos/casamento/20140830_130117.jpg",
        "../fotos/casamento/20140830_132301.jpg",
        "../fotos/casamento/20140830_132459.jpg",
        "../fotos/casamento/20140830_134341.jpg",
        "../fotos/casamento/20140830_134509-2.png",
      ]
    },
    {
      id: 'filho',
      titulo: "A Chegada do Nosso Maior Tesouro",
      data: "14 de Novembro de 2014",
      descricao: "O dia mais feliz e transformador de nossas vidas. O nascimento do nosso filho, o elo eterno que nos une e a maior prova do nosso amor.",
      imagens: [
        "../fotos/maxwell/20140916_153151.jpg",
        "../fotos/maxwell/20140916_153252.jpg",
        "../fotos/maxwell/20141031_210144.jpg",
        "../fotos/maxwell/20141114_162909.jpg",
        "../fotos/maxwell/20141114_205854.jpg",
        "../fotos/maxwell/20141115_142506.jpg",
        "../fotos/maxwell/20141223_121407.jpg",
        "../fotos/maxwell/20150308_142531.jpg",
        "../fotos/maxwell/20150712_150739.jpg",
        "../fotos/maxwell/20151010_112042.jpg",
        "../fotos/maxwell/IMG_1185.JPG",
        "../fotos/maxwell/IMG_1199.JPG",
        "../fotos/maxwell/IMG_1558.JPG",
        "../fotos/maxwell/IMG_1560.JPG",
      ]
    },
  ],
  separationEvent: {
    id: 'separacao',
    titulo: "O Fim de um Capítulo",
    data: "04 de Agosto de 2024",
    descricao: "Neste dia, nossos caminhos como casal tomaram uma nova direção. Não é um adeus, mas a transformação de uma história de amor em um laço de respeito e amizade que durará para sempre. A gratidão por cada momento permanece.",
    imagens: [
       "../fotos/termino/pngtree-an-illustration-of-a-broken-heart-set-on-stark-png-image_16874311.png",
       "../fotos/termino/pngtree-broken-heart-png-image_16368498.png",
       "../fotos/termino/pngtree-broken-heart-with-in-the-middle-png-image_20303224.png",
    ],
    destaque: "Juntos por 10 anos, 6 meses e 10 dias. Uma vida de memórias (3844 dias no total)."
  },
  momentos: {
    titulo: "Mais Momentos da Nossa História",
    texto: "Cada foto, uma risada. Cada imagem, uma saudade. Aqui estão outros pequenos fragmentos da nossa jornada, momentos simples e felizes que, juntos, formaram o grande mosaico do nosso amor.",
    imagens: [
        "../fotos/outros/20150324_165831.jpg",
        "../fotos/outros/20150324_172956.jpg",
        "../fotos/outros/20150530_234156.jpg",
        "../fotos/outros/20151008_224819.jpg",
        "../fotos/outros/20151010_040757.jpg",
        "../fotos/outros/20151010_041350.jpg",
        "../fotos/outros/20151010_041405.jpg",
        "../fotos/outros/20151010_105418.jpg",
        "../fotos/outros/20151010_105420.jpg",
        "../fotos/outros/20151010_105703.jpg",
        "../fotos/outros/20160101_001246.jpg",
        "../fotos/outros/20160101_001543.jpg",
        "../fotos/outros/20160216_145210.jpg",
        "../fotos/outros/20160220_165955.jpg",
        "../fotos/outros/20160227_225729.jpg",
        "../fotos/outros/20160227_225839.jpg",
        "../fotos/outros/20170101_014528.jpg",
        "../fotos/outros/IMG_2138.JPG",
        "../fotos/outros/IMG_2144.JPG",
        "../fotos/outros/IMG_2395.JPG",
        "../fotos/outros/IMG_2632.JPG",
    ]
  }
};

// --- COMPONENTE DE ANIMAÇÃO AO ROLAR A PÁGINA ---
const AnimateOnScroll = ({ children, className, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// --- COMPONENTE DO MODAL DE IMAGEM ---
const ImageModal = ({ modalData, onClose, onNext, onPrev }) => {
  if (!modalData.images || modalData.currentIndex === null) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalData.images, modalData.currentIndex, onClose, onNext, onPrev]);

  const imageUrl = modalData.images[modalData.currentIndex];

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 shadow-lg" aria-label="Imagem anterior"><ChevronLeft className="h-8 w-8" /></button>
      <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}><img key={imageUrl} src={imageUrl.replace(/w=\d+/, 'w=1200')} alt="Lembrança de Layla Ketna - Visualização ampliada" className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-fade-in"/></div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 shadow-lg" aria-label="Próxima imagem"><ChevronRight className="h-8 w-8" /></button>
      <button onClick={onClose} className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg transition-transform transform hover:scale-110" aria-label="Fechar">&times;</button>
    </div>
  );
};


// --- COMPONENTES DO CARROSSEL ---
const ImageCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

  if (!images || images.length === 0) return <div>Sem imagens para exibir.</div>;

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
      <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-cover transition-all duration-500 ease-in-out transform group-hover:scale-105 cursor-pointer" onClick={() => onImageClick(images, currentIndex)}></div>
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" onClick={() => onImageClick(images, currentIndex)}></div>
      <button onClick={goToPrevious} className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Imagem Anterior"><ChevronLeft className="h-6 w-6" /></button>
      <button onClick={goToNext} className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Próxima Imagem"><ChevronRight className="h-6 w-6" /></button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">{images.map((_, index) => (<div key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}></div>))}</div>
    </div>
  );
};

const MultiItemCarousel = ({ title, text, images, onImageClick }) => {
    const scrollContainerRef = useRef(null);

    const handleScroll = (direction) => {
        const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
        if (direction === 'left') {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-800 py-16 md:py-24 overflow-hidden">
            <AnimateOnScroll className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">{text}</p>
            </AnimateOnScroll>
            <AnimateOnScroll className="relative w-full">
                <button 
                    onClick={() => handleScroll('left')} 
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
                        <div key={index} className="flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] mx-2 snap-center">
                            <div 
                                className="h-96 w-full rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                onClick={() => onImageClick(images, index)}
                            >
                                <img src={image} className="h-full w-full object-cover" alt={`Lembrança de Layla Ketna - Momento ${index + 1}`}/>
                            </div>
                        </div>
                    ))}
                </div>
                 <button 
                    onClick={() => handleScroll('right')} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
                    aria-label="Avançar"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </AnimateOnScroll>
        </div>
    );
}

// --- COMPONENTE DO CONTADOR ---
const Countdown = ({ startDate }) => {
    const [timeElapsed, setTimeElapsed] = useState({});
    
    const unitLabels = {
        years: 'Anos',
        months: 'Meses',
        days: 'Dias',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos'
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const start = new Date(startDate);

            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();
            let hours = now.getHours() - start.getHours();
            let minutes = now.getMinutes() - start.getMinutes();
            let seconds = now.getSeconds() - start.getSeconds();

            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }
            if (hours < 0) {
                hours += 24;
                days--;
            }
            if (days < 0) {
                const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += prevMonthLastDay;
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }
            
            setTimeElapsed({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    const format = (num) => (num !== undefined ? num.toString().padStart(2, '0') : '00');

    return (
        <div className="flex flex-wrap justify-center gap-4 text-center">
            {Object.entries(unitLabels).map(([unit, label]) => (
                <div key={unit} className="bg-gray-700 text-white p-4 rounded-lg shadow-lg min-w-[90px]">
                    <div className="text-4xl font-bold">{format(timeElapsed[unit])}</div>
                    <div className="text-sm uppercase tracking-wider">{label}</div>
                </div>
            ))}
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA APLICAÇÃO ---
export default function App() {
  const [generatedContent, setGeneratedContent] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [modalData, setModalData] = useState({ images: null, currentIndex: null });
  const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
  const finalSectionTriggerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
          if (entry.isIntersecting) {
            setIsFinalSectionVisible(true);
          }
      },
      { threshold: 0.8 } // Ativa quando 80% do gatilho estiver visível
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
    const mainContent = document.getElementById('main-content');
    if (isFinalSectionVisible) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.opacity = '0';
    } else {
      mainContent.style.visibility = 'visible';
      mainContent.style.opacity = '1';
    }
  }, [isFinalSectionVisible]);


  // Funções do Modal
  const openModal = (images, index) => setModalData({ images, currentIndex: index });
  const closeModal = () => setModalData({ images: null, currentIndex: null });
  const handleModalNext = () => setModalData(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  const handleModalPrev = () => setModalData(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));

  // Função para chamar a API do Gemini
  const callGeminiAPI = async (prompt) => {
    const apiKey = "AIzaSyDTAqDtyIchE8SYF4zEN2BU-IYuDtzU3k4"; // Deixe em branco, será tratado pelo ambiente
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
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
    setLoadingStates(prev => ({ ...prev, [evento.id]: true }));
    setGeneratedContent(prev => ({...prev, [evento.id]: null}));
    const prompt = `Você é um poeta sensível. Escreva uma curta lembrança poética e emotiva sobre o seguinte momento vivido por um casal: Título: '${evento.titulo}', Data: '${evento.data}', Descrição: '${evento.descricao}'. Foque nos sentimentos de amor, nostalgia e na importância do momento. Use uma linguagem tocante. O texto deve ter entre 1 e 2 parágrafos.`;
    const text = await callGeminiAPI(prompt);
    setGeneratedContent(prev => ({ ...prev, [evento.id]: text }));
    setLoadingStates(prev => ({ ...prev, [evento.id]: false }));
  };

  const handleGeneratePoem = async () => {
    setLoadingStates(prev => ({ ...prev, finalPoem: true }));
    setGeneratedContent(prev => ({...prev, finalPoem: null}));
    const prompt = `Você é um poeta. Escreva um poema de 4 estrofes sobre a jornada de um casal, cujo nome da mulher é ${pageData.nomeExEsposa}. A história deles começou com um namoro em ${pageData.eventos[0].data}, eles se casaram em ${pageData.eventos[1].data} e tiveram um filho em ${pageData.eventos[2].data}. Apesar de não estarem mais juntos, existe um grande carinho, respeito e um elo eterno através do filho. O tom deve ser de gratidão, nostalgia e afeto, celebrando o que foi vivido e o legado de amor que permanece.`;
    const text = await callGeminiAPI(prompt);
    setGeneratedContent(prev => ({ ...prev, finalPoem: text }));
    setLoadingStates(prev => ({ ...prev, finalPoem: false }));
  };

  const { separationEvent } = pageData;

  return (
    <>
      <div className="bg-gray-100 font-sans text-gray-800 overflow-x-hidden">
        <div id="main-content" className="transition-opacity duration-1000">
            <header className="relative h-screen flex items-center justify-center text-center text-white p-4">
              <div className="absolute h-screen inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${pageData.imagemFundo})` }} aria-hidden="true"></div>
              <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
              <div className="relative z-20 animate-fade-in-down">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>{pageData.titulo.replace('[Nome]', pageData.nomeExEsposa)}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{pageData.textoIntroducao}</p>
              </div>
            </header>

            <main className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-16">
                  {pageData.timelineEvents.map((evento, index) => (
                    <AnimateOnScroll key={evento.id} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                      <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-last' : ''}`}><ImageCarousel images={evento.imagens} onImageClick={openModal} /></div>
                      <div className="w-full md:w-1/2">
                        <h2 className={`text-3xl font-bold mb-2 text-pink-500`}>{evento.titulo}</h2>
                        <p className="text-lg font-semibold text-gray-500 mb-4">{evento.data}</p>
                        <p className="text-base leading-relaxed">{evento.descricao}</p>
                        <button onClick={() => handleGenerateMemory(evento)} disabled={loadingStates[evento.id]} className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                          {loadingStates[evento.id] ? <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5"/> : <Sparkles className="mr-2 h-5 w-5" />}
                          {loadingStates[evento.id] ? 'Gerando...' : 'Gerar lembrança poética'}
                        </button>
                        {generatedContent[evento.id] && (<div className="mt-6 p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg"><p className="text-gray-700 whitespace-pre-wrap font-serif italic">{generatedContent[evento.id]}</p></div>)}
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
                        <AnimateOnScroll key={separationEvent.id} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-full md:w-1/2 md:order-last"><ImageCarousel images={separationEvent.imagens} onImageClick={openModal} /></div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl font-bold mb-2 text-gray-500">{separationEvent.titulo}</h2>
                                <p className="text-lg font-semibold text-gray-500 mb-4">{separationEvent.data}</p>
                                <p className="text-base leading-relaxed">{separationEvent.descricao}</p>
                                {separationEvent.destaque && (
                                <div className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-400 rounded-r-lg">
                                    <p className="text-gray-700 font-semibold italic">{separationEvent.destaque}</p>
                                </div>
                                )}
                            </div>
                        </AnimateOnScroll>

                        {/* Seção do Poema Final */}
                        <AnimateOnScroll className="text-center pt-16 border-t-2 border-gray-200 border-dashed">
                           <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa Jornada em Versos</h2>
                           <p className="max-w-2xl mx-auto text-gray-600 mb-8">O tempo passou, mas a beleza da nossa história merece ser eternizada. Clique no botão abaixo para criar um poema único sobre nosso caminho.</p>
                          <button onClick={handleGeneratePoem} disabled={loadingStates.finalPoem} className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 disabled:bg-gray-500 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                              {loadingStates.finalPoem ? <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
                              {loadingStates.finalPoem ? 'Criando Poema...' : 'Criar um poema sobre nossa jornada'}
                          </button>
                          {generatedContent.finalPoem && (<div className="mt-10 max-w-2xl mx-auto p-6 bg-gray-50 border-t-4 border-gray-800 rounded-b-lg shadow-lg"><p className="text-gray-700 whitespace-pre-wrap font-serif text-lg text-left">{generatedContent.finalPoem}</p></div>)}
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            <section className='w-screen h-screen bg-white py-16 md:py-24 flex justify-center'>
                <div className='w-0.5 h-full'>
                  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                </div>
            </section>
        
            <div ref={finalSectionTriggerRef} style={{ height: "1px" }}></div>
            <footer className="bg-gray-900 text-white text-center p-6">
              <p>Feito com amor, para lembrar de tudo que foi bom.</p>
            </footer>
        </div>
        
        {/* Seção Final em Tela Cheia */}
        <div className={`fixed inset-0 z-40 transition-opacity duration-1000 ${isFinalSectionVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <section className="bg-gray-800 text-white w-full h-full flex items-center justify-center">
                <button 
                  onClick={() => setIsFinalSectionVisible(false)}
                  className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg transition-transform transform hover:scale-110 z-50"
                  aria-label="Fechar"
                >
                  &times;
                </button>
                <div className={`transition-all duration-1000 ease-out ${isFinalSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Uma Chama Que Não se Apaga</h2>
                        <p className="max-w-3xl mx-auto text-gray-300 text-md md:text-xl mb-8">O tempo pode passar, e os relógios podem continuar a girar, mas eles não têm o poder de medir o que um coração sente. Meu amor por você não vive nos segundos que se foram, mas na eternidade de cada momento que compartilhamos. Ele continua aqui, intacto, e com ele a esperança de que um dia possamos olhar para trás e ver este tempo apenas como uma pausa em nossa história.</p>
                        <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">O tempo longe de você:</h3>
                        <Countdown startDate="2024-08-04T00:00:00-03:00" />
                        <p className="mt-8 text-gray-400 italic">Mas saiba que este contador pode parar. A qualquer momento. Ele só precisa de uma palavra sua para voltar ao zero.</p>
                    </div>
                </div>
            </section>
        </div>

      </div>

      <ImageModal modalData={modalData} onClose={closeModal} onNext={handleModalNext} onPrev={handleModalPrev} />

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
