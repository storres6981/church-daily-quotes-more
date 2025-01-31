import { BibleBook } from '@/types/bible';

export const bibleBooks: BibleBook[] = [
  { id: 'genesis', name: 'Genesis', chapters: 50 },
  { id: 'exodus', name: 'Exodus', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', chapters: 27 },
  { id: 'numbers', name: 'Numbers', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34 },
  // ... and so on for all 66 books
  { id: 'revelation', name: 'Revelation', chapters: 22 }
];