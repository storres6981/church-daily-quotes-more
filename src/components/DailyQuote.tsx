import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const DailyQuote = () => {
  const [quote, setQuote] = useState({
    text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    reference: "John 3:16"
  });

  return (
    <Card className="quote-card max-w-lg mx-auto">
      <p className="text-xl mb-4 font-crimson">{quote.text}</p>
      <p className="text-secondary text-right font-semibold">{quote.reference}</p>
    </Card>
  );
};

export default DailyQuote;