// Variables globales
let index = 0;
let totalSlides = 0;
let currentBook = null;
let rendition = null;
let allBooks = [];

// Datos de los libros
const librosData = [
    {
        id: 1,
        titulo: "El Cristo Social",
        autor: "Samael Aun Weor",
        descripcion: "Una exploración profunda de la dimensión social de la enseñanza crística, abordando la justicia, la libertad y la transformación de la sociedad.",
        imagen: "attached_assets/elcristosocial_1753411517336.jpg",
        epub: "/api/books/elcristosocial_1753411093858.epub",
        paginas: "245 páginas",
        tiempo: "4h 15min",
        destacado: true
    },
    {
        id: 2,
        titulo: "El Libro Amarillo",
        autor: "Samael Aun Weor",
        descripcion: "Un libro de ocultismo absolutamente práctico que revela las claves fundamentales del esoterismo gnóstico.",
        imagen: "attached_assets/ellibroamarillo_1753411493897.jpg",
        epub: "/api/books/ellibroamarillo_1753411118920.epub",
        paginas: "198 páginas",
        tiempo: "3h 30min",
        destacado: true
    },
    {
        id: 3,
        titulo: "El Matrimonio Perfecto",
        autor: "Samael Aun Weor",
        descripcion: "Para producir una raza de superhombres. Una guía completa sobre la alquimia sexual y la transmutación de las energías creadoras.",
        imagen: "attached_assets/elmatrimonioperfecto_1753411463936.jpg",
        epub: "/api/books/elmatrimonioperfecto_1753411145580.epub",
        paginas: "312 páginas",
        tiempo: "5h 20min",
        destacado: true
    },
    {
        id: 4,
        titulo: "La Magia de las Runas",
        autor: "Samael Aun Weor",
        descripcion: "Mensaje de Navidad 1968/1969. Abecedario Sagrado que revela los misterios de las antiguas runas nórdicas y su aplicación práctica.",
        imagen: "attached_assets/lamagiadelasrunas_1753411422147.jpg",
        epub: "/api/books/lamagiadelasrunas_1753411172512.epub",
        paginas: "156 páginas",
        tiempo: "2h 45min",
        destacado: true
    },
    {
        id: 5,
        titulo: "Pistis Sophia Develado",
        autor: "Samael Aun Weor",
        descripcion: "El libro gnóstico más importante revelado. Una interpretación esotérica del antiguo texto gnóstico de Pistis Sophia.",
        imagen: "attached_assets/pistissophia_1753411342428.jpg",
        epub: "/api/books/pistissophia_1753411217567.epub",
        paginas: "428 páginas",
        tiempo: "7h 10min",
        destacado: true
    },
    {
        id: 6,
        titulo: "Educación Fundamental",
        autor: "Samael Aun Weor",
        descripcion: "Un sistema educativo revolucionario basado en el desarrollo integral del ser humano y la sabiduría perenne.",
        imagen: "attached_assets/educacionfundamental_1753411562878.jpg",
        epub: "/api/books/educacionfundamental_1753411068116.epub",
        paginas: "276 páginas",
        tiempo: "4h 50min",
        destacado: true
    },
    {
        id: 7,
        titulo: "Curso Zodiacal",
        autor: "Samael Aun Weor",
        descripcion: "El hombre se halla crucificado en el sexo. Una obra fundamental sobre astrología esotérica y la comprensión de los signos zodiacales desde la perspectiva gnóstica.",
        imagen: "attached_assets/cursozodiacal_1753411592713.jpg",
        epub: "/api/books/cursozodiacal_1753411028462.epub",
        paginas: "189 páginas",
        tiempo: "3h 20min",
        destacado: true
    }
];

// Función para crear un slide del carrusel
function crearSlide(libro, indice) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.setAttribute('data-epub', libro.epub);
    slide.setAttribute('data-title', libro.titulo);
    slide.setAttribute('data-author', libro.autor);
    slide.setAttribute('data-index', indice);
    
    slide.innerHTML = `
        <img src="${libro.imagen}" alt="${libro.titulo}">
        <div class="slide-overlay">
            <div class="slide-title">${libro.titulo}</div>
            <div class="slide-author">${libro.autor}</div>
        </div>
    `;
    
    // Agregar event listener para abrir el visor EPUB
    slide.addEventListener('click', function() {
        abrirVisorEpub(libro.epub, libro.titulo);
    });
    
    return slide;
}

// Función para crear una tarjeta de libro en el grid
function crearBookCard(libro) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    card.innerHTML = `
        <img src="${libro.imagen}" alt="${libro.titulo}">
        <div class="book-card-info">
            <div class="book-card-title">${libro.titulo}</div>
            <div class="book-card-author">${libro.autor}</div>
        </div>
    `;
    
    // Agregar event listener para mostrar modal
    card.addEventListener('click', function() {
        mostrarModal(libro);
    });
    
    return card;
}

// Función para actualizar el carrusel 3D
function actualizarCarrusel() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, i) => {
        const offset = i - index;
        let transform = '';
        let opacity = '0';
        let zIndex = '0';
        let display = 'none';

        // Mostrar solo 5 slides (centro ± 2)
        if (Math.abs(offset) <= 2) {
            display = 'block';
            
            switch (offset) {
                case -2:
                    transform = 'translateX(-400px) translateZ(-250px) rotateY(35deg) scale(0.6)';
                    opacity = '0.4';
                    zIndex = '1';
                    break;
                case -1:
                    transform = 'translateX(-200px) translateZ(-120px) rotateY(25deg) scale(0.8)';
                    opacity = '0.7';
                    zIndex = '2';
                    break;
                case 0:
                    transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
                    opacity = '1';
                    zIndex = '3';
                    break;
                case 1:
                    transform = 'translateX(200px) translateZ(-120px) rotateY(-25deg) scale(0.8)';
                    opacity = '0.7';
                    zIndex = '2';
                    break;
                case 2:
                    transform = 'translateX(400px) translateZ(-250px) rotateY(-35deg) scale(0.6)';
                    opacity = '0.4';
                    zIndex = '1';
                    break;
            }
        }

        slide.style.display = display;
        slide.style.transform = transform;
        slide.style.opacity = opacity;
        slide.style.zIndex = zIndex;
    });
}

// Función para ir al slide anterior
function prev() {
    index = (index - 1 + totalSlides) % totalSlides;
    actualizarCarrusel();
}

// Función para ir al siguiente slide
function next() {
    index = (index + 1) % totalSlides;
    actualizarCarrusel();
}

// Función para mostrar el modal del libro
function mostrarModal(libro) {
    const modal = document.getElementById('bookModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalCover = document.getElementById('modalCover');
    const modalDescription = document.getElementById('modalDescription');
    const modalPages = document.getElementById('modalPages');
    const modalTime = document.getElementById('modalTime');

    modalTitle.textContent = libro.titulo;
    modalAuthor.textContent = `por ${libro.autor}`;
    modalCover.src = libro.imagen;
    modalCover.alt = libro.titulo;
    modalDescription.textContent = libro.descripcion;
    modalPages.textContent = libro.paginas;
    modalTime.textContent = libro.tiempo;

    // Guardar referencia del libro actual para el botón de leer
    modal.setAttribute('data-current-book', JSON.stringify(libro));

    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('bookModal');
    modal.style.display = 'none';
    document.querySelector('.close-modal').addEventListener('click', cerrarModal);
}

// Función para abrir el visor EPUB
function abrirVisorEpub(epubUrl, titulo) {
    const viewer = document.getElementById('epubViewer');
    const container = document.getElementById('epubContainer');
    const titleElement = document.getElementById('epubTitle');
    
    // Mostrar el visor
    viewer.style.display = 'block';
    titleElement.textContent = titulo;
    
    // Limpiar contenedor anterior
    container.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #666;"><i class="fas fa-spinner fa-spin fa-3x"></i></div>';
    if (!epubUrl.endsWith('.epub')) {
        alert('Este archivo no parece ser un EPUB válido.');
        return;
    }
    
    try {
        // Crear instancia del libro EPUB
        currentBook = ePub(epubUrl);
        
        // Crear la renderización
        rendition = currentBook.renderTo("epubContainer", {
            width: "100%",
            height: "100%",
            spread: "none"
        });
        
        // Mostrar el libro
        rendition.display().then(() => {
            console.log('Libro EPUB cargado:', titulo);
        });
        
        // Configurar navegación con teclado
        rendition.on("keyup", function(event) {
            if (event.key === "ArrowLeft") {
                rendition.prev();
            } else if (event.key === "ArrowRight") {
                rendition.next();
            }
        });
        
        // Actualizar progreso
        rendition.on("relocated", function(location) {
            if (location && location.start && location.start.percentage !== undefined) {
                const progress = Math.round(location.start.percentage * 100);
                document.getElementById('epubProgress').textContent = progress + '%';
            }
        });
        
        // Configurar botones de navegación
        document.getElementById('prevPage').disabled = false;
        document.getElementById('nextPage').disabled = false;
        
    } catch (error) {
        console.error('Error cargando EPUB:', error);
        container.innerHTML = `
            <div style="padding: 3rem; text-align: center; color: #666; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <i class="fas fa-exclamation-triangle fa-3x" style="color: #d4af37; margin-bottom: 1rem;"></i>
                <h3 style="color: #d4af37; margin-bottom: 1rem;">Error cargando el libro</h3>
                <p style="margin-bottom: 1rem;">No se pudo cargar el archivo EPUB: ${titulo}</p>
                <p style="margin-bottom: 2rem; font-size: 0.9rem; opacity: 0.7;">URL: ${epubUrl}</p>
                <button onclick="cerrarVisorEpub()" style="padding: 12px 24px; background: #d4af37; color: #1a1a2e; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-arrow-left"></i> Volver a la Biblioteca
                </button>
            </div>
        `;
    }
}

// Función para cerrar el visor EPUB
function cerrarVisorEpub() {
    const viewer = document.getElementById('epubViewer');
    viewer.style.display = 'none';
    document.getElementById('closeEpub').addEventListener('click', cerrarVisorEpub);
}

    
    // Limpiar recursos
    if (rendition) {
        try {
            rendition.destroy();
        } catch (e) {
            console.warn('Error al destruir rendition:', e);
        }
        rendition = null;
    }
    if (currentBook) {
        try {
            currentBook.destroy();
        } catch (e) {
            console.warn('Error al destruir book:', e);
        }
        currentBook = null;
    }
    
    // Resetear progreso
    document.getElementById('epubProgress').textContent = '0%';
}

// Función para inicializar el carrusel
function inicializarCarrusel() {
    const carrusel = document.getElementById('carrusel');
    const librosDestacados = librosData.filter(libro => libro.destacado);
    
    totalSlides = librosDestacados.length;
    
    // Limpiar carrusel
    carrusel.innerHTML = '';
    
    // Crear slides
    librosDestacados.forEach((libro, indice) => {
        const slide = crearSlide(libro, indice);
        carrusel.appendChild(slide);
    });
    
    // Inicializar posición
    index = 0;
    actualizarCarrusel();
}

// Función para inicializar el grid de libros
function inicializarBooksGrid() {
    const grid = document.getElementById('books-grid');
    
    // Limpiar grid
    grid.innerHTML = '';
    
    // Crear tarjetas
    librosData.forEach(libro => {
        const card = crearBookCard(libro);
        grid.appendChild(card);
    });
}

// Función para filtrar libros
function filtrarLibros(query) {
    if (!query || query.trim() === '') {
        // Mostrar carrusel, ocultar grid
        document.querySelector('.carousel-section').style.display = 'block';
        document.querySelector('.all-books-section').style.display = 'none';
        return;
    }
    
    // Mostrar grid, ocultar carrusel
    document.querySelector('.carousel-section').style.display = 'none';
    document.querySelector('.all-books-section').style.display = 'block';
    
    const filtrados = librosData.filter(libro => 
        libro.titulo.toLowerCase().includes(query.toLowerCase()) ||
        libro.autor.toLowerCase().includes(query.toLowerCase()) ||
        libro.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    
    const grid = document.getElementById('books-grid');
    grid.innerHTML = '';
    
    if (filtrados.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: #d4af37; padding: 3rem;">
                <i class="fas fa-search fa-3x" style="margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No se encontraron libros</h3>
                <p style="color: #e5dac6; opacity: 0.7;">Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    filtrados.forEach(libro => {
        const card = crearBookCard(libro);
        grid.appendChild(card);
    });
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando Biblioteca Gnóstica...');
    
    // Inicializar componentes
    inicializarCarrusel();
    inicializarBooksGrid();
    
    // Event listeners para controles del carrusel
    document.getElementById('prev-carrusel').addEventListener('click', prev);
    document.getElementById('next-carrusel').addEventListener('click', next);

    // Event listeners para modal
    document.querySelector('.close-modal').addEventListener('click', cerrarModal);
    document.getElementById('bookModal').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModal();
        }
    });

    // Event listener para botón de leer en modal
    document.getElementById('readButton').addEventListener('click', function() {
        const modal = document.getElementById('bookModal');
        const libroData = modal.getAttribute('data-current-book');
        
        if (libroData) {
            const libro = JSON.parse(libroData);
            cerrarModal();
            abrirVisorEpub(libro.epub, libro.titulo);
        }
    });

    // Event listener para botón de favoritos
    document.getElementById('favoriteButton').addEventListener('click', function() {
        // Aquí se puede implementar la funcionalidad de favoritos
        alert('¡Libro agregado a favoritos! (Funcionalidad próximamente)');
    });

    // Event listeners para controles del visor EPUB
    document.getElementById('closeEpub').addEventListener('click', cerrarVisorEpub);
    
    document.getElementById('prevPage').addEventListener('click', function() {
        if (rendition) {
            rendition.prev();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', function() {
        if (rendition) {
            rendition.next();
        }
    });

    // Event listener para búsqueda
    document.getElementById('buscador').addEventListener('input', function(e) {
        const query = e.target.value;
        filtrarLibros(query);
    });

    // Event listener para botón de contacto
    document.getElementById('btnContacto').addEventListener('click', function() {
        alert('Para contactar o enviar sugerencias:\n\nEmail: biblioteca@gnostica.org\n(Funcionalidad próximamente)');
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        const epubViewer = document.getElementById('epubViewer');
        const modal = document.getElementById('bookModal');
        
        if (epubViewer.style.display === 'block') {
            // Si el visor EPUB está abierto
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (rendition) rendition.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (rendition) rendition.next();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cerrarVisorEpub();
            }
        } else if (modal.style.display === 'block') {
            // Si el modal está abierto
            if (e.key === 'Escape') {
                cerrarModal();
            } else if (e.key === 'Enter') {
                // Abrir libro con Enter
                document.getElementById('readButton').click();
            }
        } else {
            // Navegación normal del carrusel
            if (e.key === 'ArrowLeft') {
                prev();
            } else if (e.key === 'ArrowRight') {
                next();
            }
        }
    });

    // Auto-rotación del carrusel (opcional)
    let autoRotate = null;
    
    function iniciarAutoRotate() {
        autoRotate = setInterval(() => {
            if (document.getElementById('epubViewer').style.display !== 'block' && 
                document.getElementById('bookModal').style.display !== 'block') {
                next();
            }
        }, 5000); // Cambiar cada 5 segundos
    }
    
    function detenerAutoRotate() {
        if (autoRotate) {
            clearInterval(autoRotate);
            autoRotate = null;
        }
    }
    
    // Iniciar auto-rotación
    iniciarAutoRotate();
    
    // Pausar auto-rotación cuando se interactúa con el carrusel
    document.querySelector('.carousel-container').addEventListener('mouseenter', detenerAutoRotate);
    document.querySelector('.carousel-container').addEventListener('mouseleave', iniciarAutoRotate);

    console.log('Biblioteca Gnóstica inicializada correctamente');
});

// Funciones globales para compatibilidad
window.prev = prev;
window.next = next;
window.cerrarModal = cerrarModal;
window.cerrarVisorEpub = cerrarVisorEpub;

// Prueba para cargar un Epub con archivo externo
document.getElementById('btnPruebaEpub').addEventListener('click', function() {
    const pruebaUrl = "https://s3.amazonaws.com/moby-dick/OPS/package.opf";
    abrirVisorEpub(pruebaUrl, "Moby Dick (Prueba)");
});