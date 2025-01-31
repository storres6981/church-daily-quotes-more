import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Search, Bookmark, Star } from "lucide-react";
import { bibleBooks } from "@/data/bible-books";
import { fetchVerses } from "@/services/bibleApi";
import type { BibleBook, BibleVerse, SavedQuote } from "@/types/bible";

const Bible = () => {
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVerses = async () => {
      if (selectedBook && selectedChapter) {
        setLoading(true);
        try {
          const fetchedVerses = await fetchVerses(selectedBook.id, selectedChapter);
          setVerses(fetchedVerses);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load Bible verses. Please try again.",
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
    toast({
      title: "Quote saved",
      description: "The quote has been added to your bookmarks.",
    });
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
              <div className="md:col-span-3">
                <h3 className="font-semibold mb-4">Select a Book</h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-1">
                    {bibleBooks.map((book) => (
                      <Button
                        key={book.id}
                        variant={selectedBook?.id === book.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedBook(book)}
                      >
                        {book.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="md:col-span-9">
                {selectedBook ? (
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
                        ) : (
                          <div className="space-y-2">
                            {verses.map((verse) => (
                              <div key={verse.verse} className="group flex items-start gap-2 p-2 hover:bg-accent rounded-md">
                                <span className="text-sm text-muted-foreground">{verse.verse}</span>
                                <p className="flex-1">{verse.text}</p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100"
                                  onClick={() => handleSaveQuote(verse)}
                                >
                                  <Star className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Select a book to start reading
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Search the Bible..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-muted-foreground text-center py-8">
                Enter a word or phrase to search
              </div>
            </div>
          </Card>
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