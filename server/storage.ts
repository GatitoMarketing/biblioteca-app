import { type Book, type InsertBook, type UserProgress, type InsertUserProgress, type Bookmark, type InsertBookmark } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Books
  getAllBooks(): Promise<Book[]>;
  getFeaturedBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | undefined>;
  searchBooks(query: string): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  
  // User Progress
  getUserProgress(bookId: string, userId: string): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Bookmarks
  getBookmarks(bookId: string, userId: string): Promise<Bookmark[]>;
  addBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  removeBookmark(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private books: Map<string, Book>;
  private userProgress: Map<string, UserProgress>;
  private bookmarks: Map<string, Bookmark>;

  constructor() {
    this.books = new Map();
    this.userProgress = new Map();
    this.bookmarks = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample books based on the provided images
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "El Cristo Social",
        author: "Samael Aun Weor",
        description: "Una exploración profunda de la dimensión social de la enseñanza crística, abordando la justicia, la libertad y la transformación de la sociedad.",
        coverImage: "/attached_assets/elcristosocial_1753411517336.jpg",
        epubPath: "/attached_assets/elcristosocial.epub",
        pages: 245,
        readingTime: "4h 15min",
        rating: "4.9",
        category: "Sociología",
        tags: ["Gnosis", "Sociedad"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "El Libro Amarillo",
        author: "Samael Aun Weor",
        description: "Un libro de ocultismo absolutamente práctico que revela las claves fundamentales del esoterismo gnóstico.",
        coverImage: "/attached_assets/ellibroamarillo_1753411493897.jpg",
        epubPath: "/attached_assets/ellibroamarillo.epub",
        pages: 198,
        readingTime: "3h 30min",
        rating: "4.8",
        category: "Esoterismo",
        tags: ["Ocultismo", "Práctica"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "El Matrimonio Perfecto",
        author: "Samael Aun Weor",
        description: "Para producir una raza de superhombres. Una guía completa sobre la alquimia sexual y la transmutación de las energías creadoras.",
        coverImage: "/attached_assets/elmatrimonioperfecto_1753411463936.jpg",
        epubPath: "/attached_assets/elmatrimonioperfecto.epub",
        pages: 287,
        readingTime: "5h 10min",
        rating: "4.7",
        category: "Alquimia",
        tags: ["Sexualidad", "Espiritualidad"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "4",
        title: "La Magia de las Runas",
        author: "Samael Aun Weor",
        description: "Mensaje de Navidad 1968/1969. Abecedario Sagrado que revela los misterios de las antiguas runas nórdicas y su aplicación práctica.",
        coverImage: "/attached_assets/lamagiadelasrunas_1753411422147.jpg",
        epubPath: "/attached_assets/lamagiadelasrunas.epub",
        pages: 156,
        readingTime: "2h 45min",
        rating: "4.6",
        category: "Runas",
        tags: ["Magia", "Nórdico"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "5",
        title: "Pistis Sophia Develado",
        author: "Samael Aun Weor",
        description: "El libro gnóstico más importante revelado. Una interpretación esotérica del antiguo texto gnóstico de Pistis Sophia.",
        coverImage: "/attached_assets/pistissophia_1753411342428.jpg",
        epubPath: "/attached_assets/pistissophia.epub",
        pages: 334,
        readingTime: "6h 20min",
        rating: "4.9",
        category: "Gnosticismo",
        tags: ["Mística", "Revelación"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "6",
        title: "Educación Fundamental",
        author: "Samael Aun Weor",
        description: "Un sistema educativo revolucionario basado en el desarrollo integral del ser humano y la sabiduría perenne.",
        coverImage: "/attached_assets/educacionfundamental_1753411562878.jpg",
        epubPath: "/attached_assets/educacionfundamental.epub",
        pages: 276,
        readingTime: "4h 50min",
        rating: "4.8",
        category: "Educación",
        tags: ["Desarrollo", "Sabiduría"],
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "7",
        title: "Curso Zodiacal",
        author: "Samael Aun Weor",
        description: "El hombre se halla crucificado en el sexo. Una obra fundamental sobre astrología esotérica y la comprensión de los signos zodiacales desde la perspectiva gnóstica.",
        coverImage: "/attached_assets/cursozodiacal_1753411592713.jpg",
        epubPath: "/attached_assets/cursozodiacal.epub",
        pages: 189,
        readingTime: "3h 20min",
        rating: "4.7",
        category: "Astrología",
        tags: ["Zodiaco", "Esoterismo"],
        isFeatured: true,
        createdAt: new Date(),
      },
    ];

    sampleBooks.forEach(book => {
      this.books.set(book.id, book);
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getFeaturedBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.isFeatured);
  }

  async getBookById(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async searchBooks(query: string, category?: string): Promise<Book[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(book => {
      const matchesQuery = book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        (book.description && book.description.toLowerCase().includes(lowercaseQuery)) ||
        (book.category && book.category.toLowerCase().includes(lowercaseQuery));
      const matchesCategory = !category || book.category === category;
      return matchesQuery && matchesCategory;
    });
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = randomUUID();
    const book: Book = {
      ...insertBook,
      id,
      description: insertBook.description || null,
      coverImage: insertBook.coverImage || null,
      pages: insertBook.pages || null,
      readingTime: insertBook.readingTime || null,
      rating: insertBook.rating || null,
      category: insertBook.category || "General",
      tags: insertBook.tags || [],
      isFeatured: insertBook.isFeatured || null,
      createdAt: new Date(),
    };
    this.books.set(id, book);
    return book;
  }

  async getUserProgress(bookId: string, userId: string): Promise<UserProgress | undefined> {
    const key = `${bookId}-${userId}`;
    return this.userProgress.get(key);
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const key = `${progress.bookId}-${progress.userId}`;
    const existing = this.userProgress.get(key);
    const id = existing?.id || randomUUID();
    
    const userProgress: UserProgress = {
      ...progress,
      id,
      currentPage: progress.currentPage || null,
      totalPages: progress.totalPages || null,
      progress: progress.progress || null,
      lastRead: new Date(),
    };
    
    this.userProgress.set(key, userProgress);
    return userProgress;
  }

  async getBookmarks(bookId: string, userId: string): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      bookmark => bookmark.bookId === bookId && bookmark.userId === userId
    );
  }

  async addBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = randomUUID();
    const newBookmark: Bookmark = {
      ...bookmark,
      id,
      note: bookmark.note || null,
      createdAt: new Date(),
    };
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }

  async removeBookmark(id: string): Promise<void> {
    this.bookmarks.delete(id);
  }
}

export const storage = new MemStorage();
