import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  epubPath: text("epub_path").notNull(),
  pages: integer("pages"),
  readingTime: text("reading_time"),
  rating: text("rating").default("4.8"),
  category: text("category").default("General"),
  tags: text("tags").array(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull().references(() => books.id),
  userId: varchar("user_id").notNull(),
  currentPage: integer("current_page").default(0),
  totalPages: integer("total_pages"),
  progress: integer("progress").default(0), // percentage
  lastRead: timestamp("last_read").default(sql`now()`),
});

export const bookmarks = pgTable("bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull().references(() => books.id),
  userId: varchar("user_id").notNull(),
  pageNumber: integer("page_number").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastRead: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
