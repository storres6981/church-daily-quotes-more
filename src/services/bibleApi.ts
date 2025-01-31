import { BibleVerse } from "@/types/bible";

const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;

interface BibleApiResponse {
  data: {
    content: string;
    verses: {
      id: string;
      orgId: string;
      bookId: string;
      chapterIds: string[];
      reference: string;
      text: string;
    }[];
  };
}

export const fetchVerses = async (
  bookId: string,
  chapter: number
): Promise<BibleVerse[]> => {
  try {
    console.log('Fetching verses with API key:', API_KEY ? 'Present' : 'Missing');
    const response = await fetch(
      `${API_URL}/bibles/de4e12af7f28f599-02/chapters/${bookId}.${chapter}/verses`,
      {
        headers: {
          'api-key': API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch Bible verses');
    }

    const data: BibleApiResponse = await response.json();
    
    return data.data.verses.map((verse) => ({
      book: verse.reference.split(" ")[0],
      chapter: chapter,
      verse: parseInt(verse.reference.split(":")[1]),
      text: verse.text,
    }));
  } catch (error) {
    console.error("Error fetching Bible verses:", error);
    throw error;
  }
};