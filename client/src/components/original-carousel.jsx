import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OriginalCarousel({ books = [], isLoading = false, onBookClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="carousel-container">
        <div className="carrusel flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-sacred-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carrusel flex items-center justify-center h-96 text-parchment-300">
          <p>No hay libros destacados disponibles</p>
        </div>
      </div>
    );
  }

  const totalSlides = books.length;

  const actualizarCarrusel = () => {
    return books.map((book, index) => {
      const offset = index - currentIndex;
      let transform = '';
      let opacity = 0;
      let zIndex = 0;
      let display = 'none';

      // Mostrar solo 5 slides (centro ± 2)
      if (Math.abs(offset) <= 2) {
        display = 'block';
        
        switch (offset) {
          case -2:
            transform = 'translateX(-350px) translateZ(-200px) rotateY(35deg) scale(0.6)';
            opacity = 0.4;
            zIndex = 1;
            break;
          case -1:
            transform = 'translateX(-175px) translateZ(-100px) rotateY(25deg) scale(0.8)';
            opacity = 0.7;
            zIndex = 2;
            break;
          case 0:
            transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
            opacity = 1;
            zIndex = 3;
            break;
          case 1:
            transform = 'translateX(175px) translateZ(-100px) rotateY(-25deg) scale(0.8)';
            opacity = 0.7;
            zIndex = 2;
            break;
          case 2:
            transform = 'translateX(350px) translateZ(-200px) rotateY(-35deg) scale(0.6)';
            opacity = 0.4;
            zIndex = 1;
            break;
        }
      }

      return {
        book,
        style: {
          display,
          transform,
          opacity,
          zIndex,
        }
      };
    });
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  const visibleBooks = actualizarCarrusel();

  return (
    <div className="carousel-container">
      <div className="carrusel relative w-full max-w-4xl h-96 mx-auto overflow-hidden">
        {/* Contenedor con perspectiva 3D */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
          {visibleBooks.map(({ book, style }, index) => (
            <div
              key={book.id}
              className="slide absolute w-40 h-60 cursor-pointer transition-all duration-500 ease-in-out"
              style={{
                ...style,
                left: '50%',
                top: '50%',
                marginLeft: '-80px',
                marginTop: '-120px',
              }}
              onClick={() => onBookClick && onBookClick(book)}
              data-title={book.title}
              data-author={book.author}
              data-epub={book.epubPath}
            >
              <img
                src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600'}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-sacred-500 border-opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-800 via-transparent to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-cinzel font-semibold text-sacred-500 text-xs mb-1">
                  {book.title}
                </h3>
                <p className="text-parchment-300 text-xs">
                  {book.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="controls flex justify-center mt-6 space-x-4">
        <Button
          onClick={handlePrev}
          className="button-prev w-12 h-12 bg-cosmic-600 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200"
          size="icon"
        >
          <ChevronLeft className="text-parchment-200 hover:text-cosmic-800" />
        </Button>
        <Button
          onClick={handleNext}
          className="button-next w-12 h-12 bg-cosmic-600 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200"
          size="icon"
        >
          <ChevronRight className="text-parchment-200 hover:text-cosmic-800" />
        </Button>
      </div>
    </div>
  );
}