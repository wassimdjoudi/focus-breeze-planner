
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Plus, Trash2, Tag, Clock, CheckCircle } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  date: Date;
  title: string;
  priority?: 'low' | 'medium' | 'high';
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
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

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
      priority
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

  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-500';
      case 'high': return 'bg-red-500/20 text-red-500';
      default: return 'bg-blue-500/20 text-blue-500';
    }
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
            <h3 className="font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Events for {format(date, 'MMMM d, yyyy')}
            </h3>
            
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add event..."
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addEvent()}
                />
                <Button onClick={addEvent} className="shrink-0">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground flex items-center">
                  <Tag className="h-3 w-3 mr-1" /> Priority:
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant={priority === 'low' ? 'default' : 'outline'}
                    className={`h-7 text-xs ${priority === 'low' ? 'bg-green-600' : ''}`}
                    onClick={() => setPriority('low')}
                  >
                    Low
                  </Button>
                  <Button 
                    size="sm" 
                    variant={priority === 'medium' ? 'default' : 'outline'}
                    className={`h-7 text-xs ${priority === 'medium' ? 'bg-blue-600' : ''}`}
                    onClick={() => setPriority('medium')}
                  >
                    Medium
                  </Button>
                  <Button 
                    size="sm" 
                    variant={priority === 'high' ? 'default' : 'outline'}
                    className={`h-7 text-xs ${priority === 'high' ? 'bg-red-600' : ''}`}
                    onClick={() => setPriority('high')}
                  >
                    High
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {todayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center justify-center p-4 border border-dashed rounded-md">
                  <CheckCircle className="h-4 w-4 mr-2 opacity-60" />
                  No events scheduled for this day.
                </p>
              ) : (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 rounded bg-muted/30 border border-border/50"
                  >
                    <div className="flex items-center">
                      <span>{event.title}</span>
                      {event.priority && (
                        <Badge variant="outline" className={`ml-2 text-xs ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEvent(event.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
