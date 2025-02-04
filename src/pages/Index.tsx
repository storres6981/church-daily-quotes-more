import DailyQuote from '@/components/DailyQuote';
import Navigation from '@/components/Navigation';
import HistoricalDate from '@/components/HistoricalDate';
import EventCalendar from '@/components/EventCalendar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container px-4 py-8 pb-24">
        <h1 className="text-4xl font-crimson font-bold text-center mb-8 text-primary">Daily Inspiration</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <HistoricalDate />
            <DailyQuote />
          </div>
          <div>
            <h2 className="text-2xl font-crimson font-bold mb-4 text-primary">Upcoming Events</h2>
            <EventCalendar />
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;