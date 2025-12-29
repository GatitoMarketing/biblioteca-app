import { Book } from "@shared/schema";

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  onBookClick: (book: Book) => void;
}

export default function BookGrid({ books, isLoading, onBookClick }: BookGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="w-full aspect-[3/4] bg-cosmic-600 rounded-lg"></div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-cosmic-600 rounded w-3/4"></div>
              <div className="h-3 bg-cosmic-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayBooks = books;

  if (displayBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-parchment-300 text-lg">
          No se encontraron libros
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {displayBooks.map((book) => (
        <div
          key={book.id}
          className="book-card cursor-pointer group"
          onClick={() => onBookClick(book)}
        >
          <img
            src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400'}
            alt={book.title}
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg border border-sacred-500 border-opacity-20 group-hover:shadow-xl group-hover:shadow-sacred-500/30 transition-all duration-300"
          />
          <div className="mt-3 text-center">
            <h3 className="font-cinzel font-medium text-sacred-500 text-sm group-hover:text-sacred-400 transition-colors">
              {book.title}
            </h3>
            <p className="text-parchment-300 text-xs mt-1">
              {book.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
