import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { BibleBook, BibleVerse } from "@/types/bible";
import { useToast } from "@/hooks/use-toast";

interface BibleReaderProps {
  selectedBook: BibleBook | null;
  selectedChapter: number | null;
  verses: BibleVerse[];
  loading: boolean;
  onSaveQuote: (verse: BibleVerse) => void;
  setSelectedChapter: (chapter: number) => void;
}

const BibleReader = ({ 
  selectedBook, 
  selectedChapter, 
  verses, 
  loading, 
  onSaveQuote,
  setSelectedChapter 
}: BibleReaderProps) => {
  const { toast } = useToast();

  const handleSaveQuote = (verse: BibleVerse) => {
    onSaveQuote(verse);
    toast({
      title: "Quote saved",
      description: "The quote has been added to your bookmarks.",
    });
  };

  if (!selectedBook) {
    return (
      <div className="md:col-span-9">
        <div className="text-center text-muted-foreground">
          Select a book to start reading
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-9">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{selectedBook.name}</h2>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: selectedBook.chapters }, (_, i) => (
            <Button
              key={i}
              variant={selectedChapter === i + 1 ? "secondary" : "outline"}
              onClick={() => setSelectedChapter(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        {selectedChapter && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Chapter {selectedChapter}</h3>
            {loading ? (
              <div className="text-center py-8">Loading verses...</div>
            ) : verses.length > 0 ? (
              <div className="space-y-2">
                {verses.map((verse) => (
                  <div 
                    key={verse.verse} 
                    className="group flex items-start gap-2 p-2 hover:bg-accent rounded-md"
                  >
                    <span className="text-sm text-muted-foreground min-w-[2rem]">
                      {verse.verse}
                    </span>
                    <p className="flex-1">{verse.text}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleSaveQuote(verse)}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No verses found for this chapter
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleReader;