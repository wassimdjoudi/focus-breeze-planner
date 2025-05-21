
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ListCheck, Plus, Trash2, Clock, AlertCircle, Calendar, Tag, Filter, CheckSquare, Square } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      createdAt: Date.now()
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Filter tasks based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Sort tasks: incomplete first, then by creation date
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt - a.createdAt;
  });

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <Card className="overflow-hidden border-primary/10 hover:border-primary/20">
      <CardHeader className="bg-gradient-to-r from-violet-900/20 via-primary/10 to-violet-900/20 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ListCheck className="h-5 w-5 text-primary" />
            Todo List
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="bg-primary/10 text-xs">
              <CheckSquare className="h-3 w-3 mr-1" />
              {completedTodosCount}
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-xs">
              <Square className="h-3 w-3 mr-1" />
              {activeTodosCount}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border-primary/20 focus:border-primary/50"
          />
          <Button onClick={addTodo} className="shrink-0">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="flex justify-between mb-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <Filter className="h-3 w-3 mr-1" />
            Filter:
          </div>
          <div className="flex gap-1">
            <Button 
              variant={filter === 'all' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-7 text-xs px-2"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'active' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-7 text-xs px-2"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button 
              variant={filter === 'completed' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-7 text-xs px-2"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
          {todos.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground border border-dashed border-muted rounded-md">
              <AlertCircle className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No tasks yet. Add some to get started!</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground border border-dashed border-muted rounded-md">
              <ListCheck className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No {filter} tasks found.</p>
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-md border transition-all
                ${todo.completed 
                  ? 'bg-muted/20 border-muted' 
                  : 'bg-card border-primary/10 hover:border-primary/30'}`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                    className="text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex flex-col">
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`cursor-pointer ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {todo.text}
                    </label>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1 opacity-70" />
                      {formatTimeAgo(todo.createdAt)}
                      <Calendar className="h-3 w-3 ml-2 mr-1 opacity-70" />
                      {new Date(todo.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {todo.completed && (
                    <Badge variant="secondary" className="text-xs h-5 px-1.5 bg-primary/20">
                      <CheckSquare className="h-3 w-3 mr-1" />
                      Done
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
