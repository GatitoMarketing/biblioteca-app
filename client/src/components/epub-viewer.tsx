import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  List,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";
import { useEpub } from "@/hooks/use-epub";
import { useTheme } from "@/context/ThemeContext.tsx";

interface EpubViewerProps {
  book: Book;
  onClose: () => void;
  onOpenSettings: () => void;
}

export default function EpubViewer({
  book,
  onClose,
  onOpenSettings,
}: EpubViewerProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [showToc, setShowToc] = useState(false);
  const [progress, setProgress] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [showControls, setShowControls] = useState(true);


  const { toc, isLoading, error, rendition } = useEpub(book.epubPath);
  const { theme } = useTheme();

  const estimatedTime = Math.ceil((totalPages - currentPage) * 2.5);

  const handlePrevPage = () => {
    if (rendition) {
      rendition.prev().catch(err => console.error("Pagination prev error:", err));
    }
  };

  const handleNextPage = () => {
    if (rendition) {
      rendition.next().catch(err => console.error("Pagination next error:", err));
    }
  };

  const setFontSize = (size: string) => {
    rendition.themes.fontSize(size);
  };

  useEffect(() => {
    if (rendition) {
      rendition.display();

      const updatePage = (location: any) => {
        if (location?.start?.displayed?.page) {
          setCurrentPage(location.start.displayed.page);
        }
        if (location?.start?.displayed?.total) {
          setTotalPages(location.start.displayed.total);
        }
      };

      rendition.on("relocated", updatePage);

      const forceSingleColumn = () => {
        rendition.themes.default({
          "html, body": {
            margin: "0",
            padding: "0",
            width: "100% !important",
            height: "100%",
            overflow: "hidden",
            background: "hsl(232, 73%, 15%)",
            color: "#FFFFFF",
            columnCount: "1 !important",
            columnWidth: "auto !important",
            columnGap: "0 !important",
            display: "block !important"
          },
          body: {
            margin: "0",
            padding: "1rem",
            backgroundColor: "inherit",
            color: "#FFFFFF",
            columnCount: "1 !important",
            columnWidth: "auto !important",
            columnGap: "0",
            maxWidth: "100% !important",
            wordWrap: "break-word",
            lineHeight: "1.6",
            fontSize: "18px",
            display: "block !important"
          },
          ".book-content": {
            columnCount: "1 !important",
            whiteSpace: "normal !important",
            columnWidth: "auto !important"
          },
          div: {
            maxWidth: "100% !important",
            columnCount: "1 !important",
            columnWidth: "auto !important",
            backgroundColor: "inherit",
            color: "#FFFFFF",
          },
          img: {
            maxWidth: "100% !important",
            height: "auto !important",
          },
          p: {
            margin: "1em 0",
            textAlign: "justify",
            color: "#FFFFFF",
            columnCount: "1 !important",
            columnWidth: "auto !important"
          },
          "*": {
            color: "#FFFFFF",
            backgroundColor: "inherit",
            columnCount: "1 !important",
            columnWidth: "auto !important"
          },
        });
      };

      forceSingleColumn();
      rendition.on("resized", forceSingleColumn);

      rendition.themes.register("darkBlue", {
        body: {
          backgroundColor: "#0A1A2F",
          color: "#FFFFFF",
        },
      });

      rendition.themes.select("darkBlue");

      return () => {
        if (rendition.off) {
          try {
            rendition.off("relocated", updatePage);
            rendition.off("resized", forceSingleColumn);
          } catch (e) {
            // silent fail on cleanup
          }
        }
      };
    }
  }, [rendition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevPage();
          break;
        case "ArrowRight":
          handleNextPage();
          break;
      }
    };
  


    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, onClose]);

  // Toggle de controles al hacer click
  const handleToggleControls = () => setShowControls(!showControls)

  return (
    <div className="fixed inset-0 bg-cosmic-gradient z-50">
      <div className="h-full flex flex-col">
        <header className="bg-cosmic-800 bg-opacity-95 backdrop-blur border-b border-sacred-500 border-opacity-30 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
                title="Cerrar libro"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="font-cinzel font-semibold text-sacred-500">
                  {book.title}
                </h1>
                <p className="text-sm text-parchment-300">{book.author}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowToc(!showToc)}
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
                title="Tabla de contenidos"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
                title="Marcador"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                onClick={onOpenSettings}
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
                title="Configuración"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex relative">
          {showToc && (
            <div className="w-80 bg-cosmic-800 bg-opacity-95 backdrop-blur border-r border-sacred-500 border-opacity-30 overflow-y-auto custom-scrollbar">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-cinzel font-semibold text-sacred-500">
                    Tabla de Contenidos
                  </h2>
                  <Button
                    onClick={() => setShowToc(false)}
                    variant="ghost"
                    size="icon"
                    className="p-1 rounded text-parchment-300 hover:text-sacred-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="space-y-2">
                  {toc.length > 0 ? (
                    toc.map((chapter, index) => (
                      <button
                        key={index}
                        onClick={() => rendition?.display(chapter.href)}
                        className="block w-full text-left p-2 rounded hover:bg-cosmic-600 hover:bg-opacity-50 text-parchment-300 hover:text-sacred-500 transition-colors text-sm"
                      >
                        {chapter.title}
                      </button>
                    ))
                  ) : (
                    <p className="text-parchment-400 text-sm">
                      No hay capítulos disponibles
                    </p>
                  )}
                </nav>
              </div>
            </div>
          )}

          <div className="flex-1 relative">
            {/* Click zones for mobile navigation */}
            <div 
              className="absolute inset-y-0 left-0 w-16 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPage();
              }}
            />
            <div 
              className="absolute inset-y-0 right-0 w-16 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPage();
              }}
            />

            <div className="h-full max-w-4xl mx-auto overflow-hidden">
              <div className="flex justify-center space-x-4 py-2 border-b border-sacred-500 border-opacity-10">
                <span className="text-parchment-300 text-xs">Tamaño de letra</span>
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="5"
                  defaultValue={100}
                  onChange={(e) => setFontSize(`${e.target.value}%`)}
                  className="w-48 h-1 accent-sacred-500"
                  />
              </div>

              {error ? (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-4">Error al cargar el libro</p>
                  <p className="text-parchment-300">{error}</p>
                </div>
              ) : (
                <div
                  id="epub-viewer-container"
                  ref={viewerRef}
                  className="w-full h-[calc(100vh-140px)] bg-transparent"
                />
              )}
            </div>

            {!isFocused && (
              <div className="fixed bottom-0 left-0 right-0 bg-cosmic-800 bg-opacity-95 backdrop-blur border-t border-sacred-500 border-opacity-30 px-4 py-3 z-50">
                <div className="flex items-center justify-between text-sm text-parchment-300">
                  <div className="flex items-center space-x-4">
                    <span>Página {currentPage} de {totalPages}</span>
                    <input
                      type="range"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        setCurrentPage(page);
                        rendition?.display(page);
                      }}
                      className="w-64 accent-sacred-500"
                    />
                  </div>
                  <Button
                    onClick={() => setShowToc(true)}
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded text-parchment-300 hover:text-sacred-500"
                    title="Índice"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <Button
              onClick={handlePrevPage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-cosmic-600 bg-opacity-80 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur"
              title="Página anterior"
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="text-parchment-200 hover:text-cosmic-800" />
            </Button>

            <Button
              onClick={handleNextPage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-cosmic-600 bg-opacity-80 hover:bg-sacred-500 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur"
              title="Página siguiente"
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="text-parchment-200 hover:text-cosmic-800" />
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-sacred-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-parchment-200 font-medium">Cargando libro...</p>
            </div>
          </div>
        )}
      </div>
    </div>
    );
    }
