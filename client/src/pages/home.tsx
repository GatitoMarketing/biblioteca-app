import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import SimpleCarousel from "@/components/simple-carousel.jsx";
import BookGrid from "@/components/book-grid";
import BookModal from "@/components/book-modal";
import EpubViewer from "@/components/epub-viewer";
import InstructionsCarousel from "@/components/instructions-carousel";
import SettingsPanel from "@/components/settings-panel";
import { Book } from "@shared/schema";
import { Book as BookIcon, Users, Star } from "lucide-react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allBooks = [], isLoading: allBooksLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const { data: searchResults = [] } = useQuery<Book[]>({
    queryKey: ["/api/books/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const displayBooks = searchQuery ? searchResults : allBooks;

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleReadNow = () => {
    setIsModalOpen(false);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedBook(null);
  };

  if (isViewerOpen && selectedBook) {
    return (
      <>
        <EpubViewer 
          book={selectedBook} 
          onClose={handleCloseViewer}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <SettingsPanel 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-gradient text-parchment-200">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="relative">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-cinzel text-4xl lg:text-6xl font-bold text-sacred-500 mb-6">
              Sabiduría Gnóstica
            </h1>
            <p className="text-xl lg:text-2xl text-parchment-300 mb-8 leading-relaxed">
              Descubre una colección única de textos gnósticos y enseñanzas de los Venerables Maestros de la Ciencia y Cultura Gnostica
            </p>

            <div className="flex justify-center items-center space-x-4 text-parchment-300">
              <div className="flex items-center space-x-2">
                <BookIcon className="text-sacred-500" size={20} />
                <span>{allBooks.length} Libros</span>
              </div>
              <div className="w-1 h-6 bg-sacred-500 opacity-30"></div>
              <div className="flex items-center space-x-2">
                <Users className="text-sacred-500" size={20} />
                <span>15,482 Lectores</span>
              </div>
              <div className="w-1 h-6 bg-sacred-500 opacity-30"></div>
              <div className="flex items-center space-x-2">
                <Star className="text-sacred-500" size={20} />
                <span>Acceso Gratuito</span>
              </div>
            </div>
          </div>
        </section>

        {!searchQuery && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-cinzel text-3xl font-semibold text-sacred-500 mb-4">
                  Libros Destacados
                </h2>
                <p className="text-parchment-300">
                  Obras fundamentales de la tradición gnóstica
                </p>
              </div>
              <SimpleCarousel onBookClick={handleBookClick} />
            </div>
          </section>
        )}

        <section className="py-16">