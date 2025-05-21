
import React from 'react';
import Navbar from '@/components/Navbar';
import PomodoroTimer from '@/components/PomodoroTimer';
import TodoList from '@/components/TodoList';
import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';
import { Sparkles, Clock, ListCheck, CalendarDays } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 mr-3 text-primary" />
            Projet BWEB USTHB
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Focus better, manage your tasks, and organize your time with our comprehensive productivity suite
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section id="pomodoro" className="scroll-mt-20">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
              </div>
              <PomodoroTimer />
            </section>
            <section id="todo" className="scroll-mt-20">
              <div className="flex items-center mb-4">
                <ListCheck className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-semibold">Todo List</h2>
              </div>
              <TodoList />
            </section>
          </div>
          <section id="calendar" className="scroll-mt-20">
            <div className="flex items-center mb-4">
              <CalendarDays className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-2xl font-semibold">Calendar</h2>
            </div>
            <Calendar />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
