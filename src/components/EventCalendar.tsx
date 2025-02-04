import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Event } from "@/types/event";

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Sunday Service',
    description: 'Weekly worship service',
    date: new Date(2024, 3, 21),
    location: 'Main Sanctuary'
  },
  {
    id: '2',
    title: 'Bible Study',
    description: 'Weekly Bible study group',
    date: new Date(2024, 3, 23),
    location: 'Room 101'
  }
];

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  const eventsForSelectedDate = date
    ? events.filter(event => 
        format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
      
      {eventsForSelectedDate.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Events for {date && format(date, 'MMMM do, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventsForSelectedDate.map(event => (
                <div key={event.id} className="border-b pb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {event.location && (
                    <p className="text-sm text-muted-foreground">📍 {event.location}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventCalendar;