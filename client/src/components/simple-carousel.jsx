// Carrusel simple en JavaScript puro, basado en el formato original
export default function SimpleCarousel({ onBookClick }) {
  let index = 0;
  let totalSlides = 7;
  
  // Convertir datos locales al formato Book esperado por el sistema React
  const libros = [
    {
      id: "1",
      title: "El Cristo Social",
      author: "Samael Aun Weor",
      coverImage: "/attached_assets/elcristosocial_1753411517336.jpg",
      epubPath: "/attached_assets/elcristosocial_1753411093858.epub",
      description: "Una exploración profunda de la dimensión social de la enseñanza crística, abordando la justicia, la libertad y la transformación de la sociedad.",
      rating: "4.8",
      readingTime: "4h 15min",
      pages: 245
    },
    {
      id: "2",
      title: "El Libro Amarillo", 
      author: "Samael Aun Weor",
      coverImage: "/attached_assets/ellibroamarillo_1753411493897.jpg",
      epubPath: "/attached_assets/ellibroamarillo_1753411118920.epub",
      description: "Un libro de ocultismo absolutamente práctico que revela las claves fundamentales del esoterismo gnóstico.",
      rating: "4.9",
      readingTime: "3h 30min",
      pages: 198
    },
    {
      id: "3",
      title: "El Matrimonio Perfecto",
      author: "Samael Aun Weor", 
      coverImage: "/attached_assets/elmatrimonioperfecto_1753411463936.jpg",
      epubPath: "/attached_assets/elmatrimonioperfecto_1753411145580.epub",
      description: "Para producir una raza de superhombres. Una guía completa sobre la alquimia sexual y la transmutación de las energías creadoras.",
      rating: "4.7",
      readingTime: "5h 20min",
      pages: 312
    },
    {
      id: "4",
      title: "La Magia de las Runas",
      author: "Samael Aun Weor",
      coverImage: "/attached_assets/lamagiadelasrunas_1753411422147.jpg", 
      epubPath: "/attached_assets/lamagiadelasrunas_1753411172512.epub",
      description: "Mensaje de Navidad 1968/1969. Abecedario Sagrado que revela los misterios de las antiguas runas nórdicas y su aplicación práctica.",
      rating: "4.6",
      readingTime: "2h 45min",
      pages: 156
    },
    {
      id: "5",
      title: "Pistis Sophia Develado",
      author: "Samael Aun Weor",
      coverImage: "/attached_assets/pistissophia_1753411342428.jpg",
      epubPath: "/attached_assets/pistissophia_1753411217567.epub",
      description: "El libro gnóstico más importante revelado. Una interpretación esotérica del antiguo texto gnóstico de Pistis Sophia.",
      rating: "4.9",
      readingTime: "7h 10min",
      pages: 428
    },
    {
      id: "6",
      title: "Educación Fundamental",
      author: "Samael Aun Weor",
      coverImage: "/attached_assets/educacionfundamental_1753411562878.jpg",
      epubPath: "/attached_assets/educacionfundamental_1753411068116.epub",
      description: "Un sistema educativo revolucionario basado en el desarrollo integral del ser humano y la sabiduría perenne.",
      rating: "4.5",
      readingTime: "4h 50min",
      pages: 276
    },
    {
      id: "7",
      title: "Curso Zodiacal",
      author: "Samael Aun Weor", 
      coverImage: "/attached_assets/cursozodiacal_1753411592713.jpg",
      epubPath: "/attached_assets/cursozodiacal_1753411028462.epub",
      description: "El hombre se halla crucificado en el sexo. Una obra fundamental sobre astrología esotérica y la comprensión de los signos zodiacales desde la perspectiva gnóstica.",
      rating: "4.4",
      readingTime: "3h 20min",
      pages: 189
    }
  ];

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
            transform = 'translateX(-350px) translateZ(-200px) rotateY(35deg) scale(0.6)';
            opacity = '0.4';
            zIndex = '1';
            break;
          case -1:
            transform = 'translateX(-175px) translateZ(-100px) rotateY(25deg) scale(0.8)';
            opacity = '0.7';
            zIndex = '2';
            break;
          case 0:
            transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
            opacity = '1';
            zIndex = '3';
            break;
          case 1:
            transform = 'translateX(175px) translateZ(-100px) rotateY(-25deg) scale(0.8)';
            opacity = '0.7';
            zIndex = '2';
            break;
          case 2:
            transform = 'translateX(350px) translateZ(-200px) rotateY(-35deg) scale(0.6)';
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

  function prev() {
    index = (index - 1 + totalSlides) % totalSlides;
    actualizarCarrusel();
  }

  function next() {
    index = (index + 1) % totalSlides;
    actualizarCarrusel();
  }

  function mostrarModal(libro) {
    // Llamar a la función onBookClick pasada como prop desde home.tsx
    if (onBookClick) {
      onBookClick(libro);
    }
  }

  // Inicializar carrusel cuando se monte el componente
  setTimeout(() => {
    actualizarCarrusel();
    
    // Agregar event listeners
    const prevBtn = document.getElementById('prev-carrusel');
    const nextBtn = document.getElementById('next-carrusel');
    
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    
    // Agregar click listeners a los slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => mostrarModal(libros[i]));
    });
  }, 100);

  return (
    <div className="carousel-container">
      <div id="carrusel" className="carrusel">
        {libros.map((libro, i) => (
          <div 
            key={i}
            className="slide" 
            data-epub={libro.epubPath} 
            data-title={libro.title} 
            data-author={libro.author}
          >
            <img src={libro.coverImage} alt={libro.title} />
          </div>
        ))}
      </div>

      <div className="controls">
        <button id="prev-carrusel" className="button-prev">⬅</button>
        <button id="next-carrusel" className="button-next">➡</button>
      </div>
    </div>
  );
}