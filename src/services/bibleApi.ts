import { BibleVerse } from "@/types/bible";
import { bibleBooks } from "@/data/bible-books";

// Expanded sample verse data
const sampleVerses: { [key: string]: { [key: number]: BibleVerse[] } } = {
  genesis: {
    1: [
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heaven and the earth." },
      { book: "Genesis", chapter: 1, verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { book: "Genesis", chapter: 1, verse: 3, text: "And God said, Let there be light: and there was light." },
      { book: "Genesis", chapter: 1, verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { book: "Genesis", chapter: 1, verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
      { book: "Genesis", chapter: 1, verse: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
      { book: "Genesis", chapter: 1, verse: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." }
    ],
    2: [
      { book: "Genesis", chapter: 2, verse: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
      { book: "Genesis", chapter: 2, verse: 2, text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
      { book: "Genesis", chapter: 2, verse: 3, text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made." },
      { book: "Genesis", chapter: 2, verse: 4, text: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens." }
    ],
  },
  exodus: {
    1: [
      { book: "Exodus", chapter: 1, verse: 1, text: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob." },
      { book: "Exodus", chapter: 1, verse: 2, text: "Reuben, Simeon, Levi, and Judah," },
      { book: "Exodus", chapter: 1, verse: 3, text: "Issachar, Zebulun, and Benjamin," },
      { book: "Exodus", chapter: 1, verse: 4, text: "Dan, and Naphtali, Gad, and Asher." },
      { book: "Exodus", chapter: 1, verse: 5, text: "And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already." }
    ],
  },
  psalms: {
    1: [
      { book: "Psalms", chapter: 1, verse: 1, text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
      { book: "Psalms", chapter: 1, verse: 2, text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
      { book: "Psalms", chapter: 1, verse: 3, text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." }
    ],
  },
  john: {
    1: [
      { book: "John", chapter: 1, verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { book: "John", chapter: 1, verse: 2, text: "The same was in the beginning with God." },
      { book: "John", chapter: 1, verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
      { book: "John", chapter: 1, verse: 4, text: "In him was life; and the life was the light of men." }
    ],
  },
  revelation: {
    1: [
      { book: "Revelation", chapter: 1, verse: 1, text: "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:" },
      { book: "Revelation", chapter: 1, verse: 2, text: "Who bare record of the word of God, and of the testimony of Jesus Christ, and of all things that he saw." },
      { book: "Revelation", chapter: 1, verse: 3, text: "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand." }
    ],
  }
};

export const fetchVerses = async (bookId: string, chapter: number): Promise<BibleVerse[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return sample verses if available, otherwise generate placeholder verses
  if (sampleVerses[bookId]?.[chapter]) {
    return sampleVerses[bookId][chapter];
  }

  // Generate meaningful placeholder verses if no sample data exists
  const book = bibleBooks.find(b => b.id === bookId);
  if (!book) {
    throw new Error(`Book ${bookId} not found`);
  }

  return Array.from({ length: 15 }, (_, i) => ({
    book: book.name,
    chapter,
    verse: i + 1,
    text: `This is a placeholder verse ${i + 1} for ${book.name} chapter ${chapter}. The actual text will be available in a future update.`
  }));
};

export const searchBible = async (query: string): Promise<BibleVerse[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Search through all sample verses
  const results: BibleVerse[] = [];
  
  Object.values(sampleVerses).forEach(chapters => {
    Object.values(chapters).forEach(verses => {
      verses.forEach(verse => {
        if (verse.text.toLowerCase().includes(query.toLowerCase())) {
          results.push(verse);
        }
      });
    });
  });

  return results.slice(0, 20); // Limit results to 20 verses
};