import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { BibleVerse } from "@/types/bible";
import { searchBible } from "@/services/bibleApi";
import { useToast } from "@/hooks/use-toast";

const BibleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchBible(searchQuery);
      setSearchResults(results);
    } catch (error: any) {
      toast({
        title: "Search failed",
        description: error.message || "Failed to search Bible verses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search the Bible..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="space-y-4">
          {searchResults.map((verse, index) => (
            <div key={index} className="p-4 bg-accent/50 rounded-lg">
              <p className="font-semibold mb-2">{verse.book} {verse.chapter}:{verse.verse}</p>
              <p>{verse.text}</p>
            </div>
          ))}
          {searchResults.length === 0 && !isSearching && (
            <div className="text-muted-foreground text-center py-8">
              Enter a word or phrase to search
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BibleSearch;