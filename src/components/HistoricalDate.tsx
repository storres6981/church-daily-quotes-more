import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import historicalDates from "../data/christian-dates.json";

const HistoricalDate = () => {
  const today = new Date();
  const formattedDate = format(today, "MMMM do, yyyy");
  const dayOfWeek = format(today, "EEEE");
  const month = format(today, "M");
  const day = format(today, "d");

  const { data: historicalEvent, isLoading } = useQuery({
    queryKey: ["historicalEvent", month, day],
    queryFn: async () => {
      const monthDayKey = `${month}/${day}`;
      return historicalDates[monthDayKey as keyof typeof historicalDates] || 
             "No historical event recorded for this day.";
    },
  });

  return (
    <Card className="mb-6 bg-white/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="text-lg font-medium text-primary">{formattedDate}</div>
        <div className="text-md text-muted-foreground mb-2">{dayOfWeek}</div>
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading historical event...</div>
        ) : (
          <div className="text-sm text-muted-foreground">{historicalEvent}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalDate;