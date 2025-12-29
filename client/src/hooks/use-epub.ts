import { useState, useEffect } from 'react';
// @ts-ignore - epubjs no tiene typings completos
import ePub from 'epubjs';

interface TocItem {
  title: string;
  href: string;
}

interface UseEpubReturn {
  toc: TocItem[];
  isLoading: boolean;
  error: string | null;
  book: any | null;
  rendition: any | null;
}

export function useEpub(epubPath: string): UseEpubReturn {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [book, setBook] = useState<any>(null);
  const [rendition, setRendition] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    let currentBook: any = null;

    const loadEpub = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!epubPath) throw new Error('Ruta EPUB no proporcionada');

        // Crear instancia del libro
        currentBook = ePub(epubPath);
        await currentBook.ready;

        if (!mounted) return;
        setBook(currentBook);

        // Obtener TOC o fallback al spine
        let tocItems: TocItem[] = [];
        const navigation = await currentBook.loaded.navigation;

        if (navigation?.toc?.length) {
          tocItems = navigation.toc.map((item: any, i: number) => ({
            title: (typeof item.label === 'string'
              ? item.label
              : item.label?.text || `Capítulo ${i + 1}`).trim(),
            href: item.href
          }));
        } else {
          tocItems = currentBook.spine.items.map((item: any, i: number) => ({
            title: item.label || `Capítulo ${i + 1}`,
            href: item.href
          }));
        }

        setToc(tocItems);

        // Renderizar en contenedor
        const container = document.getElementById("epub-viewer-container");
        if (!container) throw new Error("No se encontró el contenedor #epub-viewer-container");
        console.log("Contenedor existe:", document.getElementById("epub-viewer-container"));
        const renditionInstance = currentBook.renderTo(container, {
          width: "100%",
          height: "100%",
          flow: "paginated",
          manager: "default",
          allowScriptedContent: true,
        });

        // Force single column and fix flow issues aggressively
        const forceStyles = () => {
          renditionInstance.themes.default({
            body: {
              "column-count": "1 !important",
              "column-width": "auto !important",
              "column-gap": "0 !important",
              "display": "block !important",
              "overflow": "visible !important",
              "width": "100% !important",
              "white-space": "normal !important"
            },
            html: {
              "height": "100% !important",
              "display": "block !important",
              "overflow": "visible !important",
              "width": "100% !important"
            },
            ".book-content": {
              "column-count": "1 !important",
              "white-space": "normal !important"
            },
            "div, p, section, article": {
              "column-count": "1 !important",
              "column-width": "auto !important"
            }
          });
        };

        forceStyles();
        renditionInstance.on("resized", forceStyles);
        renditionInstance.on("relocated", forceStyles);

        // Ensure pagination works by listening to relocated events
        renditionInstance.on("relocated", (location: any) => {
          console.log("Book relocated:", location);
        });

        // Add touch/swipe support for pagination if needed
        renditionInstance.on("keyup", (e: KeyboardEvent) => {
          if ((e.keyCode || e.which) === 37) renditionInstance.prev();
          if ((e.keyCode || e.which) === 39) renditionInstance.next();
        });

        // Ensure resizing doesn't break single column
        renditionInstance.on("resized", () => {
          renditionInstance.themes.default({
            body: {
              "column-count": "1 !important"
            }
          });
        });

        setRendition(renditionInstance);

        // Mostrar primer capítulo explícitamente
        if (tocItems.length > 0) {
          await renditionInstance.display(tocItems[0].href);
        } else {
          await renditionInstance.display();
        }

      } catch (err) {
        console.error("Error al cargar EPUB:", err);
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadEpub();

    return () => {
      mounted = false;
      if (currentBook?.destroy) currentBook.destroy();
    };
  }, [epubPath]);

  return {
    toc,
    isLoading,
    error,
    book,
    rendition,
  };
}
