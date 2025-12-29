import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookSchema, insertUserProgressSchema, insertBookmarkSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Books routes
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books" });
    }
  });

  app.get("/api/books/featured", async (req, res) => {
    try {
      const books = await storage.getFeaturedBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured books" });
    }
  });

  app.get("/api/books/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter required" });
      }
      const books = await storage.searchBooks(query);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error searching books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Error fetching book" });
    }
  });

  // User progress routes
  app.get("/api/progress/:bookId/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.bookId, req.params.userId);
      res.json(progress || null);
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Bookmarks routes
  app.get("/api/bookmarks/:bookId/:userId", async (req, res) => {
    try {
      const bookmarks = await storage.getBookmarks(req.params.bookId, req.params.userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookmarks" });
    }
  });

  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmarkData = insertBookmarkSchema.parse(req.body);
      const bookmark = await storage.addBookmark(bookmarkData);
      res.json(bookmark);
    } catch (error) {
      res.status(400).json({ message: "Invalid bookmark data" });
    }
  });

  app.delete("/api/bookmarks/:id", async (req, res) => {
    try {
      await storage.removeBookmark(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error removing bookmark" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
