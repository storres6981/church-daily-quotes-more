import { BibleVerse } from "@/types/bible";

const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = "YOUR_API_KEY"; // We'll handle this securely

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
    const response = await fetch(
      `${API_URL}/bibles/de4e12af7f28f599-02/chapters/${bookId}.${chapter}/verses`,
      {
        headers: {
          "api-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Bible verses");
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