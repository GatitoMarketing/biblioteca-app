import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";

interface BookCarouselProps {
  books: Book[];
  isLoading: boolean;
  onBookClick: (book: Book) => void;
}

export default function BookCarousel({ books, isLoading, onBookClick }: BookCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="relative carousel-3d">
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-sacred-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="relative carousel-3d">
        <div className="flex items-center justify-center h-96 text-parchment-300">
          <p>No hay libros destacados disponibles</p>
        </div>
      </div>
    );
  }

  const totalBooks = books.length;

  const updateCarousel = () => {
    return books.map((book, index) => {
      const offset = index - currentIndex;
      const absOffset = Math.abs(offset);
      
      if (absOffset <= 2) {
        return {
          book,
          style: {
            display: 'block',
            transform: `
              translateX(${offset * 200}px) 
              translateZ(${-absOffset * 100}px) 
              rotateY(${offset * 15}deg)
              scale(${1 - absOffset * 0.1})
            `,
            opacity: 1 - absOffset * 0.3,
            zIndex: 10 - absOffset,
          }
        };
      } else {
        return {
          book,
          style: {
            display: 'none',
          }
        };
      }
    });
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + totalBooks) % totalBooks);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % totalBooks);
  };

  const visibleBooks = updateCarousel();

  return (
    <div className="relative carousel-3d">
      <div className="flex items-center justify-center h-96 perspective-1000">
        {visibleBooks.map(({ book, style }, index) => (
          <div
            key={book.id}
            className="book-card slide-3d absolute w-48 cursor-pointer"
            style={style}
            onClick={() => onBookClick(book)}
          >
            <img
              src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600'}
              alt={book.title}
              className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border-2 border-sacred-500 border-opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-800 via-transparent to-transparent rounded-lg"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="font-cinzel font-semibold text-sacred-500 text-sm mb-1">
                {book.title}
              </h3>
              <p className="text-parchment-300 text-xs">
                {book.author}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Carousel Controls */}
      <Button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-cosmic-600 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        size="icon"
      >
        <ChevronLeft className="text-parchment-200 hover:text-cosmic-800" />
      </Button>
      <Button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-cosmic-600 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        size="icon"
      >
        <ChevronRight className="text-parchment-200 hover:text-cosmic-800" />
      </Button>
    </div>
  );
}
