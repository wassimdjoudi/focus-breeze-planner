
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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
            Projet BWEB USTHB
          </h1>
          <p className="text-muted-foreground mt-2">
            Focus better, manage your tasks, organize your time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PomodoroTimer />
            <TodoList />
          </div>
          <div>
            <Calendar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
