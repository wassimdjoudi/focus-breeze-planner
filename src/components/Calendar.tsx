
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface Event {
  id: string;
  date: Date;
  title: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      return parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
    return [];
  });
  const [newEvent, setNewEvent] = useState('');

  React.useEffect(() => {
    localStorage.setItem(
      'calendar-events',
      JSON.stringify(events)
    );
  }, [events]);

  const addEvent = () => {
    if (newEvent.trim() === '') return;
    
    const event: Event = {
      id: Date.now().toString(),
      date: new Date(date),
      title: newEvent,
    };
    
    setEvents([...events, event]);
    setNewEvent('');
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Filter events for the selected date
  const todayEvents = events.filter(
    (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  // Function to check if a date has events
  const hasEventForDate = (date: Date) => {
    return events.some(
      (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Card id="calendar" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border p-3 pointer-events-auto"
            modifiersStyles={{
              selected: { backgroundColor: 'hsl(var(--primary))' },
              today: { 
                fontWeight: 'bold',
                border: '1px solid hsl(var(--primary))'
              },
            }}
            modifiers={{
              hasEvent: (date) => hasEventForDate(date),
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20",
            }}
          />

          <div>
            <h3 className="font-medium mb-2">
              Events for {format(date, 'MMMM d, yyyy')}
            </h3>
            
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add event..."
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addEvent()}
              />
              <Button onClick={addEvent} className="shrink-0">
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {todayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No events scheduled for this day.
                </p>
              ) : (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 rounded bg-muted/30"
                  >
                    <span>{event.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEvent(event.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
