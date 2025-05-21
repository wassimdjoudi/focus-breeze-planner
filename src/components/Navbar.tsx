
import React, { useState, useEffect } from 'react';
import { Clock, ListCheck, CalendarDays, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`border-b border-border backdrop-blur-lg sticky top-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-black/70 shadow-lg' : 'bg-card/60'
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
            USTHB Productivity
          </span>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('pomodoro')}
            className="flex items-center hover:bg-primary/20"
          >
            <Clock className="h-4 w-4 mr-2" />
            Pomodoro
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('todo')}
            className="flex items-center hover:bg-primary/20"
          >
            <ListCheck className="h-4 w-4 mr-2" />
            Todo
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('calendar')}
            className="flex items-center hover:bg-primary/20"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 px-4 bg-card/90 backdrop-blur-lg border-t border-border">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('pomodoro')}
              className="flex items-center justify-start hover:bg-primary/20"
            >
              <Clock className="h-4 w-4 mr-2" />
              Pomodoro
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('todo')}
              className="flex items-center justify-start hover:bg-primary/20"
            >
              <ListCheck className="h-4 w-4 mr-2" />
              Todo
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('calendar')}
              className="flex items-center justify-start hover:bg-primary/20"
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
