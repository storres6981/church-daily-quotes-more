import { BibleVerse } from "@/types/bible";
import { bibleBooks } from "@/data/bible-books";

// Sample verse data for demonstration
const sampleVerses: { [key: string]: { [key: number]: BibleVerse[] } } = {
  genesis: {
    1: [
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heaven and the earth." },
      { book: "Genesis", chapter: 1, verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { book: "Genesis", chapter: 1, verse: 3, text: "And God said, Let there be light: and there was light." },
      // Add more verses as needed
    ],
    2: [
      { book: "Genesis", chapter: 2, verse: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
      { book: "Genesis", chapter: 2, verse: 2, text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
      // Add more verses as needed
    ],
  },
  exodus: {
    1: [
      { book: "Exodus", chapter: 1, verse: 1, text: "Now these are the names of the children of Israel, which came into Egypt." },
      { book: "Exodus", chapter: 1, verse: 2, text: "Reuben, Simeon, Levi, and Judah," },
      // Add more verses as needed
    ],
  },
};

export const fetchVerses = async (bookId: string, chapter: number): Promise<BibleVerse[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return sample verses if available, otherwise generate placeholder verses
  if (sampleVerses[bookId]?.[chapter]) {
    return sampleVerses[bookId][chapter];
  }

  // Generate placeholder verses if no sample data exists
  const book = bibleBooks.find(b => b.id === bookId);
  if (!book) {
    throw new Error(`Book ${bookId} not found`);
  }

  return Array.from({ length: 10 }, (_, i) => ({
    book: book.name,
    chapter,
    verse: i + 1,
    text: `Sample verse ${i + 1} for ${book.name} chapter ${chapter}.`
  }));
};

export const searchBible = async (query: string): Promise<BibleVerse[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return sample search results
  return Object.values(sampleVerses)
    .flatMap(chapters => Object.values(chapters))
    .flatMap(verses => verses)
    .filter(verse => verse.text.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);
};
