import { X, BookOpen, Heart, Star, Clock, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onReadNow: () => void;
}

export default function BookModal({ book, isOpen, onClose, onReadNow }: BookModalProps) {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cosmic-800 border border-sacred-500 border-opacity-30 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar [&>button]:hidden">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="font-cinzel text-2xl font-bold text-sacred-500">
              Información del Libro
            </DialogTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg bg-sacred-500 text-cosmic-800 hover:bg-sacred-400 transition-colors duration-200"
              title="Cerrar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 pt-4">
          <div className="md:w-1/3">
            <img
              src={book.coverImage || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600'}
              alt={book.title}
              className="w-full rounded-lg shadow-lg border-2 border-sacred-500 border-opacity-30 mb-4"
            />
            <Button
                onClick={onReadNow}
                className="w-full bg-sacred-500 hover:bg-sacred-400 text-cosmic-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Leer Ahora</span>
              </Button>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="font-cinzel text-xl font-bold text-sacred-500">
                {book.title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-parchment-300 hover:text-sacred-500 transition-colors"
                title="Favorito"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-parchment-300 mb-4">
              por {book.author}
            </p>
            
            <div className="flex items-center space-x-4 mb-4 text-sm text-parchment-300">
              <div className="flex items-center space-x-1">
                <Star className="text-sacred-500 h-4 w-4" />
                <span>{book.rating}</span>
              </div>
              {book.readingTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="text-sacred-500 h-4 w-4" />
                  <span>{book.readingTime}</span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center space-x-1">
                  <FileText className="text-sacred-500 h-4 w-4" />
                  <span>{book.pages} páginas</span>
                </div>
              )}
            </div>
            
            <p className="text-parchment-300 mb-6 leading-relaxed">
              {book.description || "Una obra fundamental de la tradición gnóstica que ofrece enseñanzas profundas sobre el camino espiritual y la transformación interior."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
