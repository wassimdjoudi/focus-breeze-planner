
import React from 'react';
import { Clock, ListCheck, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg">USTHB Productivity</span>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('pomodoro')}
            className="flex items-center"
          >
            <Clock className="h-4 w-4 mr-2" />
            Pomodoro
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('todo')}
            className="flex items-center"
          >
            <ListCheck className="h-4 w-4 mr-2" />
            Todo
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('calendar')}
            className="flex items-center"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
