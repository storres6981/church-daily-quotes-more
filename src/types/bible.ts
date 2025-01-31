export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  apiCode: string;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface SavedQuote {
  id: string;
  verse: BibleVerse;
  note?: string;
  timestamp: Date;
}