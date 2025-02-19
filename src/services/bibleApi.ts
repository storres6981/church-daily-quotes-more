
import { BibleVerse } from "@/types/bible";
import { bibleBooks } from "@/data/bible-books";

const bibleVerses: { [key: string]: { [key: number]: BibleVerse[] } } = {
  genesis: {
    1: [
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heaven and the earth." },
      { book: "Genesis", chapter: 1, verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { book: "Genesis", chapter: 1, verse: 3, text: "And God said, Let there be light: and there was light." },
      { book: "Genesis", chapter: 1, verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { book: "Genesis", chapter: 1, verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." }
    ]
  },
  john: {
    1: [
      { book: "John", chapter: 1, verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { book: "John", chapter: 1, verse: 2, text: "The same was in the beginning with God." },
      { book: "John", chapter: 1, verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
      { book: "John", chapter: 1, verse: 4, text: "In him was life; and the life was the light of men." },
      { book: "John", chapter: 1, verse: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." }
    ],
    3: [
      { book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { book: "John", chapter: 3, verse: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." }
    ]
  },
  psalms: {
    23: [
      { book: "Psalms", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want." },
      { book: "Psalms", chapter: 23, verse: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
      { book: "Psalms", chapter: 23, verse: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
      { book: "Psalms", chapter: 23, verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." }
    ]
  }
};

export const fetchVerses = async (bookId: string, chapter: number): Promise<BibleVerse[]> => {
  // Add a small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Convert bookId to lowercase to ensure consistent matching
  const lowercaseBookId = bookId.toLowerCase();
  
  // Check if we have the verses in our local data
  if (bibleVerses[lowercaseBookId]?.[chapter]) {
    return bibleVerses[lowercaseBookId][chapter];
  }

  // If verses aren't in local data, find the book and return placeholder verses
  const book = bibleBooks.find(b => b.id.toLowerCase() === lowercaseBookId);
  if (!book) {
    throw new Error(`Book ${bookId} not found`);
  }

  // Generate placeholder verses
  return Array.from({ length: 10 }, (_, i) => ({
    book: book.name,
    chapter,
    verse: i + 1,
    text: `[Placeholder] Verse ${i + 1} from ${book.name} chapter ${chapter}.`
  }));
};

export const searchBible = async (query: string): Promise<BibleVerse[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const results: BibleVerse[] = [];
  
  Object.values(bibleVerses).forEach(chapters => {
    Object.values(chapters).forEach(verses => {
      verses.forEach(verse => {
        if (verse.text.toLowerCase().includes(query.toLowerCase())) {
          results.push(verse);
        }
      });
    });
  });

  return results.slice(0, 20);
};
