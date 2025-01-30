import DailyQuote from '@/components/DailyQuote';
import Navigation from '@/components/Navigation';
import HistoricalDate from '@/components/HistoricalDate';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container px-4 py-8 pb-24">
        <h1 className="text-4xl font-crimson font-bold text-center mb-8 text-primary">Daily Inspiration</h1>
        <HistoricalDate />
        <DailyQuote />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;