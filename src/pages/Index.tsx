
import React from 'react';
import Navbar from '@/components/Navbar';
import PomodoroTimer from '@/components/PomodoroTimer';
import TodoList from '@/components/TodoList';
import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent mb-4">
            Projet BWEB USTHB
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Focus better, manage your tasks, and organize your time with our comprehensive productivity suite
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section id="pomodoro" className="scroll-mt-20">
              <PomodoroTimer />
            </section>
            <section id="todo" className="scroll-mt-20">
              <TodoList />
            </section>
          </div>
          <section id="calendar" className="scroll-mt-20">
            <Calendar />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
