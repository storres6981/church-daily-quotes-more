import { BibleBook } from '@/types/bible';

export const bibleBooks: BibleBook[] = [
  { id: 'genesis', name: 'Genesis', chapters: 50, apiCode: 'GEN' },
  { id: 'exodus', name: 'Exodus', chapters: 40, apiCode: 'EXO' },
  { id: 'leviticus', name: 'Leviticus', chapters: 27, apiCode: 'LEV' },
  { id: 'numbers', name: 'Numbers', chapters: 36, apiCode: 'NUM' },
  { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34, apiCode: 'DEU' },
  // ... and so on for all 66 books
  { id: 'revelation', name: 'Revelation', chapters: 22, apiCode: 'REV' }
];