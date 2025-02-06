import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Search, Bookmark, Star } from "lucide-react";
import { bibleBooks } from "@/data/bible-books";
import { fetchVerses } from "@/services/bibleApi";
import type { BibleBook, BibleVerse, SavedQuote } from "@/types/bible";
import { useToast } from "@/hooks/use-toast";
import BibleReader from "@/components/bible/BibleReader";
import BibleSearch from "@/components/bible/BibleSearch";
import BookList from "@/components/bible/BookList";

const Bible = () => {
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(bibleBooks[0]); // Default to Genesis
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1); // Default to chapter 1
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVerses = async () => {
      if (selectedBook && selectedChapter) {
        setLoading(true);
        try {
          const fetchedVerses = await fetchVerses(selectedBook.id, selectedChapter);
          setVerses(fetchedVerses);
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "Failed to load Bible verses. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadVerses();
  }, [selectedBook, selectedChapter, toast]);

  const handleSaveQuote = (verse: BibleVerse) => {
    const newQuote: SavedQuote = {
      id: Math.random().toString(36).substr(2, 9),
      verse,
      timestamp: new Date(),
    };
    setSavedQuotes([...savedQuotes, newQuote]);
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Bible</h1>
      <Tabs defaultValue="read" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="read" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Read
          </TabsTrigger>
          <TabsTrigger value="search" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="gap-2">
            <Bookmark className="w-4 h-4" />
            Bookmarks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="read">
          <Card className="p-6">
            <div className="grid md:grid-cols-12 gap-6">
              <BookList
                books={bibleBooks}
                selectedBook={selectedBook}
                onSelectBook={setSelectedBook}
              />
              <BibleReader
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
                verses={verses}
                loading={loading}
                onSaveQuote={handleSaveQuote}
                setSelectedChapter={setSelectedChapter}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <BibleSearch />
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <Card className="p-6">
            {savedQuotes.length > 0 ? (
              <div className="space-y-4">
                {savedQuotes.map((quote) => (
                  <div key={quote.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">
                        {quote.verse.book} {quote.verse.chapter}:{quote.verse.verse}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSavedQuotes(savedQuotes.filter(q => q.id !== quote.id));
                          toast({
                            title: "Quote removed",
                            description: "The quote has been removed from your bookmarks.",
                          });
                        }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <p>{quote.verse.text}</p>
                    <Separator />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No saved quotes yet. Highlight verses while reading to save them here.
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bible;