// EPUB utility functions for future EPUB.js integration

export interface EpubMetadata {
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  language?: string;
  rights?: string;
}

export interface EpubChapter {
  id: string;
  title: string;
  href: string;
  content?: string;
}
// @ts-ignore porque epubjs no tiene typings completos
import ePub from "epubjs";

export class EpubParser {
  private book: any | null = null;

  async loadBook(url: string): Promise<void> {
    try {
      this.book = ePub(url);
      await this.book.ready;
      console.log("EPUB loaded:", url);
    } catch (error) {
      throw new Error(`Failed to load EPUB: ${error}`);
    }
  }

  async getMetadata(): Promise<EpubMetadata> {
    if (!this.book) throw new Error("Book not loaded");

    const metadata = await this.book.loaded.metadata;
    return {
      title: metadata.title,
      author: metadata.creator,
      description: metadata.description,
      publisher: metadata.publisher,
      language: metadata.language,
      rights: metadata.rights,
    };
  }

  async getTableOfContents(): Promise<EpubChapter[]> {
    if (!this.book) throw new Error("Book not loaded");

    const navigation = await this.book.loaded.navigation;
    return navigation.toc.map((item: any, index: number) => ({
      id: String(index),
      title: item.label,
      href: item.href,
    }));
  }

  async getChapterContent(href: string): Promise<string> {
    if (!this.book) throw new Error("Book not loaded");

    const section = this.book.spine.get(href);
    if (!section) throw new Error(`Chapter not found: ${href}`);

    const content = await section.load(this.book.load.bind(this.book));
    return content; // HTML del capítulo
  }

  destroy(): void {
    if (this.book) {
      this.book.destroy();
      this.book = null;
    }
  }
  }

  export const epubParser = new EpubParser();