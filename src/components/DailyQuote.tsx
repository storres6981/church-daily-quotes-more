import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const QUOTES = [
  { text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.", reference: "John 3:16" },
  { text: "I can do all things through him who strengthens me.", reference: "Philippians 4:13" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31" },
  { text: "Let all that you do be done in love.", reference: "1 Corinthians 16:14" },
  { text: "This is the day that the Lord has made; let us rejoice and be glad in it.", reference: "Psalm 118:24" },
  { text: "And we know that for those who love God all things work together for good.", reference: "Romans 8:28" },
  { text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.", reference: "Ephesians 4:32" }
];

const DailyQuote = () => {
  const { toast } = useToast();
  const [quote, setQuote] = useState(QUOTES[0]);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

  useEffect(() => {
    const getQuoteForToday = () => {
      const today = new Date();
      const index = today.getDate() % QUOTES.length;
      return QUOTES[index];
    };

    const checkAndUpdateQuote = () => {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem('lastQuoteDate');
      const newQuote = getQuoteForToday();

      if (today !== storedDate) {
        setQuote(newQuote);
        localStorage.setItem('lastQuoteDate', today);
        toast({
          title: "New Daily Quote",
          description: "Today's inspirational quote has been updated!",
        });
      }
      setLastUpdateDate(today);
    };

    checkAndUpdateQuote();
    
    // Check for new quotes at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(checkAndUpdateQuote, timeUntilMidnight);
    
    return () => clearTimeout(midnightTimeout);
  }, [toast]);

  return (
    <Card className="quote-card max-w-lg mx-auto p-6">
      <p className="text-xl mb-4 font-crimson">{quote.text}</p>
      <p className="text-secondary text-right font-semibold">{quote.reference}</p>
    </Card>
  );
};

export default DailyQuote;