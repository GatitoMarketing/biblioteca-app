import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InstructionItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const instructions: InstructionItem[] = [
  {
    id: 1,
    icon: "fas fa-search",
    title: "Busca y Descubre",
    description: "Encuentra libros por título, autor o tema usando nuestra búsqueda inteligente"
  },
  {
    id: 2,
    icon: "fas fa-book-open",
    title: "Lee Inmediatamente",
    description: "Haz clic en cualquier libro para comenzar a leer en nuestro visor EPUB avanzado"
  },
  {
    id: 3,
    icon: "fas fa-cog",
    title: "Personaliza tu Lectura",
    description: "Ajusta el tamaño de fuente, tema y espaciado para una experiencia óptima"
  },
  {
    id: 4,
    icon: "fas fa-bookmark",
    title: "Guarda tu Progreso",
    description: "Marca páginas importantes y mantén tu progreso de lectura sincronizado"
  },
  {
    id: 5,
    icon: "fas fa-users",
    title: "Comunidad Gnóstica",
    description: "Conecta con otros estudiantes y comparte insights sobre las enseñanzas"
  }
];

export default function InstructionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instructions.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + instructions.length) % instructions.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % instructions.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const currentInstruction = instructions[currentIndex];

  return (
    <div className="relative">
      {/* Main Carousel Display */}
      <div className="text-center">
        <div className="relative h-80 flex items-center justify-center">
          <div 
            className="transition-all duration-500 ease-in-out transform"
            key={currentIndex}
          >
            <div className="w-20 h-20 bg-sacred-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-opacity-30 transition-colors animate-pulse">
              <i className={`${currentInstruction.icon} text-3xl text-sacred-500`}></i>
            </div>
            <h3 className="font-cinzel font-semibold text-sacred-500 mb-4 text-2xl">
              {currentInstruction.title}
            </h3>
            <p className="text-parchment-300 text-lg max-w-md mx-auto leading-relaxed">
              {currentInstruction.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 bg-cosmic-600 bg-opacity-50 hover:bg-sacred-500 hover:bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-200"
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-5 h-5 text-parchment-200" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {instructions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-sacred-500 scale-125'
                  : 'bg-cosmic-600 hover:bg-sacred-500 hover:bg-opacity-50'
              }`}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 bg-cosmic-600 bg-opacity-50 hover:bg-sacred-500 hover:bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-200"
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-5 h-5 text-parchment-200" />
        </button>
      </div>

      {/* Auto-play indicator */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center space-x-2 text-parchment-300 text-sm">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-sacred-500 animate-pulse' : 'bg-cosmic-600'}`}></div>
          <span>{isAutoPlaying ? 'Reproducción automática' : 'Pausado'}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full max-w-md mx-auto">
        <div className="w-full h-1 bg-cosmic-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sacred-500 transition-all duration-100 ease-linear"
            style={{ 
              width: isAutoPlaying ? '100%' : `${((currentIndex + 1) / instructions.length) * 100}%`,
              animation: isAutoPlaying ? 'progress-bar 4s linear infinite' : 'none'
            }}
          ></div>
        </div>
      </div>

    </div>
  );
}