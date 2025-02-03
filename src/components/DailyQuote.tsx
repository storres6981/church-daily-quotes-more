import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const QUOTES = [
  { text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.", reference: "John 3:16" },
  { text: "I can do all things through him who strengthens me.", reference: "Philippians 4:13" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" }
];

const DailyQuote = () => {
  const { toast } = useToast();
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const getQuoteForToday = () => {
      const today = new Date();
      const index = today.getDate() % QUOTES.length;
      return QUOTES[index];
    };

    const checkAndUpdateQuote = () => {
      const newQuote = getQuoteForToday();
      if (newQuote.text !== quote.text) {
        setQuote(newQuote);
        toast({
          title: "New Daily Quote",
          description: "Today's inspirational quote has been updated!",
        });
      }
    };

    checkAndUpdateQuote();
    
    // Check for new quotes at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(checkAndUpdateQuote, timeUntilMidnight);
    
    return () => clearTimeout(midnightTimeout);
  }, [quote.text, toast]);

  return (
    <Card className="quote-card max-w-lg mx-auto p-6">
      <p className="text-xl mb-4 font-crimson">{quote.text}</p>
      <p className="text-secondary text-right font-semibold">{quote.reference}</p>
    </Card>
  );
};

export default DailyQuote;