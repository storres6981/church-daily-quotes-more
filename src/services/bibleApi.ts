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

    // First, fetch the chapter content
    const response = await fetch(
      `${API_URL}/bibles/de4e12af7f28f599-02/chapters/${book.apiCode}.${chapter}`,
      {
        headers: {
          'api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Error fetching Bible verses: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.data || !data.data.content) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    // Create a temporary div to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.data.content;

    // Get all verse elements with class 'v'
    const verseElements = tempDiv.querySelectorAll('.v');
    const verses: BibleVerse[] = [];

    verseElements.forEach((element) => {
      const verseNumber = parseInt(element.getAttribute('data-number') || '0');
      if (verseNumber > 0) {
        // Get the text content of the verse and any following text nodes until the next verse
        let verseText = '';
        let currentNode = element.nextSibling;
        
        while (currentNode && !(currentNode instanceof Element && currentNode.classList.contains('v'))) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            verseText += currentNode.textContent;
          }
          currentNode = currentNode.nextSibling;
        }

        verses.push({
          book: book.name,
          chapter,
          verse: verseNumber,
          text: verseText.trim()
        });
      }
    });

    return verses.sort((a, b) => a.verse - b.verse);
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