import { BibleVerse } from "@/types/bible";
import { bibleBooks } from "@/data/bible-books";

const API_URL = "https://api.scripture.api.bible/v1";
const STORAGE_KEY = "BIBLE_API_KEY";

export const initializeBibleApi = (apiKey: string) => {
  localStorage.setItem(STORAGE_KEY, apiKey);
};

export const fetchVerses = async (bookId: string, chapter: number): Promise<BibleVerse[]> => {
  try {
    const apiKey = localStorage.getItem(STORAGE_KEY);
    if (!apiKey) {
      throw new Error("API key not found");
    }

    console.log('Fetching verses with API key:', 'Present');
    
    const book = bibleBooks.find(b => b.id === bookId);
    if (!book) {
      throw new Error(`Book ${bookId} not found`);
    }

    const response = await fetch(
      `${API_URL}/bibles/de4e12af7f28f599-02/chapters/${book.apiCode}.${chapter}`,
      {
        headers: {
          'api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching Bible verses: ${await response.text()}`);
    }

    const data = await response.json();
    return data.data.verses.map((verse: any) => ({
      book: book.name,
      chapter,
      verse: verse.number,
      text: verse.text
    }));
  } catch (error) {
    console.error('Error fetching Bible verses:', error);
    throw error;
  }
};

export const searchBible = async (query: string): Promise<BibleVerse[]> => {
  try {
    const apiKey = localStorage.getItem(STORAGE_KEY);
    if (!apiKey) {
      throw new Error("API key not found");
    }

    const response = await fetch(
      `${API_URL}/bibles/de4e12af7f28f599-02/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error searching Bible: ${await response.text()}`);
    }

    const data = await response.json();
    return data.data.verses.map((verse: any) => ({
      book: verse.reference,
      chapter: parseInt(verse.chapterNumber),
      verse: parseInt(verse.verseNumber),
      text: verse.text
    }));
  } catch (error) {
    console.error('Error searching Bible:', error);
    throw error;
  }
};